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
        public async Task<List<Inventory>> GetAll()
        {
            return await _inventoryRepository.GetAll();
        }
        public async Task<int> GetProductStockAsync(int productId)
        {
            return await _inventoryRepository.GetProductStockAsync(productId);
        }

        public async Task<bool> UpdateProductStockAsync(Inventory item)
        {
            var respone= await _inventoryRepository.UpdateProductStockAsync(item);
            if (respone)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> AddNewInventoryItemAsync(Inventory item)
        {
           var respone= await _inventoryRepository.AddNewInventoryItemAsync(item);
            if (respone)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> DeleteInventoryItemAsync(int productId)
        {
            return await _inventoryRepository.DeleteInventoryItemAsync(productId);
        }
    }
}
