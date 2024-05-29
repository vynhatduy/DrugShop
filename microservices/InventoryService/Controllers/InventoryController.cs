using Azure;
using InventoryServices.Models;
using InventoryServices.Service_Layer;
using Microsoft.AspNetCore.Mvc;

namespace InventoryServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }
        [HttpGet]
        public async Task<ActionResult<List<Inventory>>> GetAll()
        {
            return Ok(await _inventoryService.GetAll());
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<int>> GetProductStock(int productId)
        {
            var stock = await _inventoryService.GetProductStockAsync(productId);
            return Ok(stock);
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProductStock(Inventory item)
        {
            var respone = await _inventoryService.UpdateProductStockAsync(item);
            if (respone)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpPost]
        public async Task<ActionResult> AddNewInventoryItem(Inventory item)
        {
            var respone =  await _inventoryService.AddNewInventoryItemAsync(item);
            if (respone)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpDelete("{productId}")]
        public async Task<ActionResult> DeleteInventoryItem(int productId)
        {
            var result = await _inventoryService.DeleteInventoryItemAsync(productId);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
