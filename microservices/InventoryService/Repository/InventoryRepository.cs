using InventoryServices.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryServices.Repository
{
    public class InventoryRepository : IInventoryRepository
    {
        private readonly MyDbContext _context;

        public InventoryRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetProductStockAsync(int productId)
        {
            var item = await _context.Inventories.FirstOrDefaultAsync(i => i.ProductId == productId);
            return item != null ? item.Quantity : 0;
        }

        public async Task UpdateProductStockAsync(int productId, int quantity,int sales)
        {
            var item = await _context.Inventories.FirstOrDefaultAsync(i => i.ProductId == productId);
            if (item != null)
            {
                item.Quantity = quantity;
                item.Sales = sales;
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddNewInventoryItemAsync(Inventory item)
        {
            item.Sales = 0;
            _context.Inventories.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteInventoryItemAsync(int productId)
        {
            var item = await _context.Inventories.FirstOrDefaultAsync(i => i.ProductId == productId);
            if (item != null)
            {
                _context.Inventories.Remove(item);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
