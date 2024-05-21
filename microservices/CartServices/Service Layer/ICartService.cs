using CartServices.Models;

namespace CartServices.Service_Layer
{
    public interface ICartService
    {
        Task<IEnumerable<Cart>> GetAllItemsAsync(string Username);
        Task AddOrUpdateItemAsync(Cart cartItem);
        Task<bool> RemoveItemAsync(string Username, int id);
        Task RemoveAsync(string Username);
    }

}
