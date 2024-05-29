using Microsoft.EntityFrameworkCore;
using OrderServices.Models;
using System.Collections;

namespace OrderServices.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MyDbContext _dbContext;

        public OrderRepository(MyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<OrderModel>> AdminGetAll()
        {
            var ds = await _dbContext.Orders.Include(x => x.OrderDetails).Select(item => new OrderModel
            {
                Username = item.Username,
                OrderDate = item.OrderDate,
                Status = item.Status,
                TotalPrice = item.TotalPrice,
                Address = item.Address,
                Details = item.OrderDetails.Select(detail => new OrderDetailModel
                {
                    ProductId = detail.ProductId,
                    Name = detail.Name,
                    Img = detail.Img,
                    Price = detail.Price,
                    Quantity = detail.Quantity
                }).ToList()
            }).ToListAsync();
            return ds;
        }
        public async Task<IEnumerable<Order>> GetAllOrdersAsync(string Username)
        {
            return await _dbContext.Orders.Where(o => o.Username == Username).ToListAsync();
        }

        public async Task<List<OrderDetail>> GetOrderByIdAsync(string Username, int id)
        {
            var order=await _dbContext.Orders.FirstOrDefaultAsync(x=>x.Username==Username&& x.Id==id);
            if (order == null)
            {
                return new List<OrderDetail>();
            }
            var orderDetail = await _dbContext.OrderDetails.Where(x => x.OrderId == id).ToListAsync();
            return orderDetail;
        }

        public async Task<bool> CreateOrderAsync(Order order, List<OrderDetail> orderDetails)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                _dbContext.Orders.Add(order);
                await _dbContext.SaveChangesAsync();
                await Console.Out.WriteLineAsync(orderDetails.ToString());
                var existingOrder = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Id == order.Id);
                if (existingOrder != null)
                {
                    foreach(var item in orderDetails)
                    {
                        item.OrderId = existingOrder.Id;
                        _dbContext.OrderDetails.Add(item);
                    }
                }
                else
                {
                    await transaction.RollbackAsync();
                    return false;
                }

                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();
                await Console.Out.WriteLineAsync("Thêm đơn hàng thành công");
                return true;
            }
            catch (Exception e)
            {
                await transaction.RollbackAsync();
                await Console.Out.WriteLineAsync("Thêm đơn hàng không thành công " + e.Message);
                return false;
            }
        }


        public async Task<bool> UpdateOrderStatusAsync(string Username, int orderId, string status)
        {
            try
            {
                var order = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Username == Username && x.Id == orderId);
                if (order != null)
                {
                    order.Status = status;
                    await _dbContext.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
        }
        public async Task<bool> AdminUpdate(string username, DateTime orderDate)
        {
            try
            {
                var item = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Username == username && x.OrderDate == orderDate);
                await Console.Out.WriteLineAsync(item.ToString());
                if (item == null)
                {
                    return false;
                }
                item.Status = "Chờ giao";
                _dbContext.Orders!.Update(item);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            catch
            {
                return false;
            }
        }
        public async Task<bool> UsernameExistsAsync(string Username)
        {
            var item = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Username == Username);
            if (item != null)
            {
                return true;
            }
            return false;
        }
    }
}
