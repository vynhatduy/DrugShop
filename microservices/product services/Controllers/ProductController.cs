using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using product_services.Models;
using product_services.Service_Layer;
using System.Text;
using System.Text.Json.Serialization;

namespace product_services.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly HttpClient _inventoryService;

        public ProductsController(IProductService productService, IHttpClientFactory factory)
        {
            _productService = productService;
            _inventoryService = factory.CreateClient();
            _inventoryService.BaseAddress = new System.Uri("https://localhost:8001/api/");
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetProductsAsync();
            return Ok(products);
        }
        [HttpGet("admin")]
        //[Authorize(Roles ="Administrator")]
        public async Task<ActionResult<IEnumerable<ProductModel>>> GetProductAdmin()
        {
            var products = await _productService.GetProductsAsync();
            var respone = await _inventoryService.GetAsync("Inventory");
            var productModel = new List<ProductModel>();
            if (respone.IsSuccessStatusCode)
            {
                var responeContent = await respone.Content.ReadAsStringAsync();
                var inventoryData = JsonConvert.DeserializeObject<List<InventoryRespone>>(responeContent);
                foreach (var item in products)
                {
                    foreach (var itemInventory in inventoryData)
                    {
                        if (item.Id == itemInventory.ProductId)
                        {
                            productModel.Add(new ProductModel
                            {
                                Id = item.Id,
                                Name = item.Name,
                                Description = item.Description,
                                Type = item.Type,
                                Img = item.Img,
                                Price = item.Price,
                                Quantity = itemInventory.Quantity,
                                Sales = itemInventory.Sales
                            });
                        }
                    }
                }
            }
            return Ok(productModel);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult> AddProduct(ProductModel model)
        {
            try
            {
                var product = new Product
                {
                    Id = model.Id,
                    Description = model.Description,
                    Img = model.Img,
                    Name = model.Name,
                    Price = model.Price,
                    Type = model.Type,
                };
                var inventory = new InventoryRespone
                {
                    ProductId = model.Id,
                    Quantity = model.Quantity,
                    Sales = model.Sales
                };
                var JsonModel = JsonConvert.SerializeObject(inventory);
                var content=new StringContent(JsonModel,Encoding.UTF8,"application/json");
                var respone = await _inventoryService.PostAsync("Inventory", content);
                if (respone.IsSuccessStatusCode)
                {
                    var responesave = await _productService.AddProductAsync(product);
                    if (responesave)
                    {
                        return Ok();
                    }
                    return BadRequest(new { message = "Không thể thêm mới sản phẩm vào danh sách sản phẩm" });
                }
                return BadRequest(new {message="Không thể thêm mới sản phẩm vào kho"});
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return BadRequest(new { message = "Lỗi" });
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, ProductModel model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }
            try
            {
                var product = new Product
                {
                    Id = model.Id,
                    Description = model.Description,
                    Img = model.Img,
                    Name = model.Name,
                    Price = model.Price,
                    Type = model.Type,
                };
                var inventory = new InventoryRespone
                {
                    ProductId = model.Id,
                    Quantity = model.Quantity,
                    Sales = model.Sales
                };
                var JsonModel = JsonConvert.SerializeObject(inventory);
                var content = new StringContent(JsonModel, Encoding.UTF8, "application/json");
                var respone = await _inventoryService.PutAsync("Inventory/"+id, content);
                if (respone.IsSuccessStatusCode)
                {
                    var responesave = await _productService.UpdateProductAsync(id,product);
                    if (responesave)
                    {
                        return Ok();
                    }
                    return BadRequest();
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            try
            {
                var respone = await _inventoryService.DeleteAsync("Inventory/" + id);
                if (respone.IsSuccessStatusCode)
                {
                    var result = await _productService.DeleteProductAsync(id);
                    if (result)
                    {
                        return Ok();
                    }
                    return BadRequest(new { message = "Không thể xóa sản phẩm trong danh sách sản phẩm" });

                }
                return BadRequest(new { message = "Không thể xóa sản phẩm trong kho" });
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return BadRequest(new {message="Lỗi thực hiện"});
            }
        }
    }
}
