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

        public async Task<IEnumerable<Order>> GetAllOrdersAsync(string Username)
        {
            return await _dbContext.Orders.Where(o => o.Username==Username).ToListAsync();
        }

        public async Task<List<OrderDetail>> GetOrderByIdAsync(string Username,int id)
        {
            List<OrderDetail> list=new List<OrderDetail>();
            var itemOrder = await _dbContext.Orders.Where(x => x.Username == Username).ToListAsync();
            if (itemOrder == null)
            {
                return list;
            }
            foreach (var x in itemOrder)
            {
                var item = await _dbContext.OrderDetails.Where(x => x.OrderId == id).ToListAsync();
                if (item != null)
                {
                    list.AddRange(item);
                }
            }
            return list;
        }

        public async Task<bool> CreateOrderAsync(Order order, List<OrderDetail> orderDetails)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync();
            try
            {
                _dbContext.Orders.Add(order);
                await _dbContext.SaveChangesAsync();

                foreach (var detail in orderDetails)
                {
                    var item = await _dbContext.Orders.FirstOrDefaultAsync(x => x.Username == order.Username && x.OrderDate == order.OrderDate && x.TotalPrice == order.TotalPrice && x.Address == order.Address && x.Status == order.Status);
                    detail.OrderId = item!.Id;
                    await _dbContext.OrderDetails.AddAsync(detail);
                    await Console.Out.WriteLineAsync("Id san pham: "+detail.ProductId);
                    await _dbContext.SaveChangesAsync();
                }

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

        public async Task<bool> UpdateOrderStatusAsync(string Username,int orderId, string status)
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
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
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
