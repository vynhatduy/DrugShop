using Microsoft.EntityFrameworkCore;
using UserServices.Helper;

namespace UserServices.Models
{
    public class MyDbContext:DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> otp) : base(otp)
        {

        }
        public DbSet<Role> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var admin = HasherPassword.HashPass("admin");
            var manager = HasherPassword.HashPass("manager");
            var user = HasherPassword.HashPass("user");

            modelBuilder.Entity<Role>().HasKey(x => x.RoleId);
            modelBuilder.Entity<User>().HasKey(x => x.UserId);
            modelBuilder.Entity<UserRole>().HasKey(x => x.UserRoleId);

            // Seed data
            modelBuilder.Entity<Role>().HasData(
                new Role { RoleId = 1, Name = "Admin" },
                new Role { RoleId = 2, Name = "Manager" },
                new Role { RoleId = 3, Name = "User" }
            );

            modelBuilder.Entity<User>().HasData(
                new User {UserId=1, Username = "admin",PasswordHash=admin["password"],PasswordSalt=admin["salt"],Name="Admin",Address="Da Lat" },
                new User {UserId=2, Username = "manager",PasswordHash=manager["password"],PasswordSalt=manager["salt"],Name="Manager",Address="Da Lat" },
                new User {UserId=3, Username = "user",PasswordHash=user["password"],PasswordSalt=user["salt"],Name="User",Address="Da Lat" }
                );
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole {UserRoleId=1, Username="Admin",RoleId=1},
                new UserRole {UserRoleId=2, Username="Manager",RoleId=2},
                new UserRole {UserRoleId = 3, Username="User",RoleId=3}
                );
            base.OnModelCreating(modelBuilder);
        }
    }
}
