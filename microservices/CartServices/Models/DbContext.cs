using Microsoft.EntityFrameworkCore;

namespace CartServices.Models
{
    public class MyDbContext:DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> otp) : base(otp)
        {

        }
        public DbSet<Cart> Carts { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Cart>()
        .HasKey(x => x.ProductId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
