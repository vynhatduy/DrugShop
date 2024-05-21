using System.ComponentModel.DataAnnotations.Schema;

namespace OrderServices.Models
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
