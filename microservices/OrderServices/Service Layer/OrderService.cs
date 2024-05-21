using OrderServices.Models;
using OrderServices.Repository;

namespace OrderServices.Service_Layer
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<Order>> GetAllOrdersAsync(string Username)
        {
            var orders = await _orderRepository.GetAllOrdersAsync(Username);
            return orders;
        }

        public async Task<List<OrderDetail>> GetOrderByIdAsync(string Username, int id)
        {
            var order = await _orderRepository.GetOrderByIdAsync(Username,id);
            if (order == null)
            {
                return null;
            }

            return order;
        }

        public async Task<bool> CreateOrderAsync(OrderModel orderModel)
        {
            try
            {
                var order = new Order
                {
                    Username = orderModel.Username,
                    OrderDate = DateTime.UtcNow,
                    TotalPrice = orderModel.TotalPrice,
                    Address = orderModel.Address,
                    Status = "Chờ duyệt"
                };
                var orderDetails = new List<OrderDetail>();
                foreach(var item in orderModel.Details)
                {
                    orderDetails.Add(new OrderDetail
                    {
                        ProductId = item.ProductId,
                        Name = item.Name,
                        Img = item.Img,
                        Quantity = item.Quantity,
                        Price = item.Price
                    });
                }

                await _orderRepository.CreateOrderAsync(order, orderDetails);
                await Console.Out.WriteLineAsync("Đã thêm thành công");
                return true;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync("Lỗi không thể thêm hóa đơn "+ ex.Message);
                return false;
            }
        }

        public async Task<bool> UpdateOrderStatusAsync(string Username,int orderId, string status)
        {
            var result= await _orderRepository.UpdateOrderStatusAsync(Username,orderId, status);
            if (result)
            {
                return true;
            }
            return false;
        }
    }
}
