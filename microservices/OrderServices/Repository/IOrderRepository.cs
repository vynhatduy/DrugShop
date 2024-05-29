using OrderServices.Models;

namespace OrderServices.Repository
{
    public interface IOrderRepository
    {
        Task<List<OrderModel>> AdminGetAll();
        Task<IEnumerable<Order>> GetAllOrdersAsync(string Username);
        Task<List<OrderDetail>> GetOrderByIdAsync(string Username,int id);
        Task<bool> CreateOrderAsync(Order order, List<OrderDetail> orderDetails);
        Task<bool> UpdateOrderStatusAsync(string Username, int orderId, string status);
        Task<bool> AdminUpdate(string username, DateTime orderDate);
        Task<bool> UsernameExistsAsync(string Username);
    }
}
