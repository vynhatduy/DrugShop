using InventoryServices.Models;
using InventoryServices.Repository;

namespace InventoryServices.Service_Layer
{
    public class InventoryService : IInventoryService
    {
        private readonly IInventoryRepository _inventoryRepository;

        public InventoryService(IInventoryRepository inventoryRepository)
        {
            _inventoryRepository = inventoryRepository;
        }

        public async Task<int> GetProductStockAsync(int productId)
        {
            return await _inventoryRepository.GetProductStockAsync(productId);
        }

        public async Task UpdateProductStockAsync(int productId, int quantity,int sales)
        {
            await _inventoryRepository.UpdateProductStockAsync(productId, quantity,sales);
        }

        public async Task AddNewInventoryItemAsync(Inventory item)
        {
            await _inventoryRepository.AddNewInventoryItemAsync(item);
        }

        public async Task<bool> DeleteInventoryItemAsync(int productId)
        {
            return await _inventoryRepository.DeleteInventoryItemAsync(productId);
        }
    }
}
