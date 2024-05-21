using OrderServices.Models;

namespace OrderServices.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync(string Username);
        Task<List<OrderDetail>> GetOrderByIdAsync(string Username,int id);
        Task<bool> CreateOrderAsync(Order order, List<OrderDetail> orderDetails);
        Task<bool> UpdateOrderStatusAsync(string Username, int orderId, string status);
        Task<bool> UsernameExistsAsync(string Username);
    }
}
