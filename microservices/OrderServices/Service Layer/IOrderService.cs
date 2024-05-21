using OrderServices.Models;

namespace OrderServices.Service_Layer
{
    public interface IOrderService
    {
        Task<IEnumerable<Order>> GetAllOrdersAsync(string Username);
        Task<List<OrderDetail>> GetOrderByIdAsync(string Username,int id);
        Task<bool> CreateOrderAsync(OrderModel orderModel);
        Task<bool> UpdateOrderStatusAsync(string Username,int orderId, string status);
    }
}
