using OrderServices.Models;

namespace OrderServices.Service_Layer
{
    public interface IOrderService
    {
        Task<List<OrderModel>> AdminGetAll();
        Task<IEnumerable<Order>> GetAllOrdersAsync(string Username);
        Task<List<OrderDetail>> GetOrderByIdAsync(string Username,int id);
        Task<bool> CreateOrderAsync(OrderModel orderModel);
        Task<bool> UpdateOrderStatusAsync(string Username,int orderId, string status);
        Task<bool> AdminUpdate(string username, DateTime orderDate);
    }
}
