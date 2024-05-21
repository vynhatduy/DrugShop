namespace OrderServices.Models
{
    public class OrderDetailModel
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Img { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
