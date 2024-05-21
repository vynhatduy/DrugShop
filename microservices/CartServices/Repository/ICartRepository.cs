using CartServices.Models;

namespace CartServices.Repository
{
    public interface ICartRepository
    {
        Task<IEnumerable<Cart>> GetAllItemsAsync(string Username);
        Task<Cart> GetById(string Username,int id);
        Task AddItemAsync(Cart cartItem);
        Task UpdateItemAsync(Cart cartItem);
        Task<bool> RemoveItemAsync(string Username, int id);
        Task RemoveAsync(string Username);
    }
}
