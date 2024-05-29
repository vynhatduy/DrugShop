using product_services.Models;

namespace product_services.Repository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProductsAsync();
        Task<Product> GetProductByIdAsync(int id);
        Task<bool> AddProductAsync(Product product);
        Task<bool> UpdateProductAsync(int id, Product product);
        Task<bool> DeleteProductAsync(int id);
    }

}
