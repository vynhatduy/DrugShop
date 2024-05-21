using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CartServices.Models
{
    public class Cart
    {
        public string Username { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int ProductId { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Img { get; set; }
        public double Price { get; set; }
    }
}
