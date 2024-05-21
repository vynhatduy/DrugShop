using InventoryServices.Models;

namespace InventoryServices.Service_Layer
{
    public interface IInventoryService
    {
        Task<int> GetProductStockAsync(int productId);
        Task UpdateProductStockAsync(int productId, int quantity,int sales);
        Task AddNewInventoryItemAsync(Inventory item);
        Task<bool> DeleteInventoryItemAsync(int productId);
    }
}
