namespace OrderServices.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalPrice { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
