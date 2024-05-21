using System.ComponentModel.DataAnnotations.Schema;

namespace product_services.Models
{
    public class Product
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
    }
}
