using CartServices.Models;
using CartServices.Service_Layer;
using Microsoft.AspNetCore.Mvc;

namespace CartServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{Username}")]
        public async Task<IActionResult> GetAllItems(string Username)
        {
            var items = await _cartService.GetAllItemsAsync(Username);
            return Ok(items);
        }

        [HttpPost("addOrUpdate")]
        public async Task<IActionResult> AddOrUpdateItem([FromBody] Cart cartItem)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _cartService.AddOrUpdateItemAsync(cartItem);
            return Ok();
        }

        [HttpDelete("{Username}")]
        public async Task<IActionResult> RemoveItem(string Username)
        {
            await _cartService.RemoveAsync(Username);
            return Ok();
        }
        [HttpDelete("{Username}/{id}")]
        public async Task<IActionResult> RemoveItem(string Username,int id)
        {
            var result= await _cartService.RemoveItemAsync(Username,id);
            return result ? Ok():BadRequest();
        }
    }
}
