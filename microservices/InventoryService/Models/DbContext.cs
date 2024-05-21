using Microsoft.EntityFrameworkCore;

namespace InventoryServices.Models
{
    public class MyDbContext:DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> otp) : base(otp)
        {

        }
        public DbSet<Inventory> Inventories { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Inventory>().HasKey(x => x.ProductId);
            modelBuilder.Entity<Inventory>().HasData(
                new Inventory
                {
                    ProductId=1,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=2,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=3,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=4,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=5,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=6,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=7,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=8,
                    Quantity=100,
                    Sales=0
                },
                new Inventory
                {
                    ProductId=9,
                    Quantity=100,
                    Sales=0
                }

                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
