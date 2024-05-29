namespace product_services.Models
{
    public class ProductModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public int Sales { get; set; }
    }
}
