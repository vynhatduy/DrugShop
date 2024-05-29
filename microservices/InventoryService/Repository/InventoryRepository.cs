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
        public async Task<List<Inventory>> GetAll()
        {
            var item = await _context.Inventories.ToListAsync();
            return item;
        }
        public async Task<int> GetProductStockAsync(int productId)
        {
            var item = await _context.Inventories.FirstOrDefaultAsync(i => i.ProductId == productId);
            return item != null ? item.Quantity : 0;
        }

        public async Task<bool> UpdateProductStockAsync(Inventory item)
        {
            try
            {
                var x = await _context.Inventories.FirstOrDefaultAsync(i => i.ProductId == item.ProductId);
                if (x != null)
                {
                    x.Quantity = item.Quantity;
                    x.Sales = item.Sales;
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;

            }
        }

        public async Task<bool> AddNewInventoryItemAsync(Inventory item)
        {
            try
            {
                var newItem = new Inventory
                {
                    Quantity = item.Quantity,
                    Sales = item.Sales
                };
                _context.Inventories.Add(newItem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
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
