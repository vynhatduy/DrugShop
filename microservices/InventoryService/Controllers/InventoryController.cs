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

        [HttpGet("{productId}")]
        public async Task<ActionResult<int>> GetProductStock(int productId)
        {
            var stock = await _inventoryService.GetProductStockAsync(productId);
            return Ok(stock);
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProductStock(int productId, int quantity,int sales)
        {
            await _inventoryService.UpdateProductStockAsync(productId, quantity,sales);
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult> AddNewInventoryItem(Inventory item)
        {
            await _inventoryService.AddNewInventoryItemAsync(item);
            return CreatedAtAction(nameof(GetProductStock), new { productId = item.ProductId }, item);
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
