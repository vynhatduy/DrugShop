using Microsoft.EntityFrameworkCore;
using product_services.Models;

namespace product_services.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly MyDbContext _context;

        public ProductRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<bool> AddProductAsync(Product product)
        {
            try
            {
                var newItem = new Product
                {
                    Name = product.Name,
                    Description = product.Description,
                    Img = product.Img,
                    Price = product.Price,
                    Type = product.Type
                };
                _context.Products.Add(newItem);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
        }

        public async Task<bool> UpdateProductAsync(int id, Product product)
        {
            try
            {
                var existingProduct = await _context.Products.FindAsync(id);
                if (existingProduct == null)
                    return false;

                existingProduct.Name = product.Name;
                existingProduct.Description = product.Description;
                existingProduct.Type = product.Type;
                existingProduct.Img = product.Img;
                existingProduct.Price = product.Price;

                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x=>x.Id==id);
            if (product == null)
                return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
