using InventoryServices.Models;

namespace InventoryServices.Service_Layer
{
    public interface IInventoryService
    {
        Task<List<Inventory>> GetAll();
        Task<int> GetProductStockAsync(int productId);
        Task<bool> UpdateProductStockAsync(Inventory item);
        Task<bool> AddNewInventoryItemAsync(Inventory item);
        Task<bool> DeleteInventoryItemAsync(int productId);
    }
}
