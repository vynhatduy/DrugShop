namespace OrderServices.Models
{
    public class OrderModel
    {
        public string Username { get; set; }
        public DateTime OrderDate { get; set; }
        public double TotalPrice { get; set; }
        public string Address { get; set; }
        public string Status { get; set; }
        public List<OrderDetailModel> Details { get; set; }  
    }
}
