using product_services.Models;
using product_services.Repository;

namespace product_services.Service_Layer
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<Product>> GetProductsAsync()
        {
            return await _productRepository.GetProductsAsync();
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            return await _productRepository.GetProductByIdAsync(id);
        }

        public async Task<bool> AddProductAsync(Product product)
        {
            return await _productRepository.AddProductAsync(product);
        }

        public async Task<bool> UpdateProductAsync(int id, Product product)
        {
            return await _productRepository.UpdateProductAsync(id, product);
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            return await _productRepository.DeleteProductAsync(id);
        }
    }
}
