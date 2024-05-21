using Microsoft.EntityFrameworkCore;

namespace product_services.Models
{
    public class MyDbContext:DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> otp) : base(otp)
        {

        }
        public DbSet<Product> Products { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>().HasKey(x => x.Id);
            modelBuilder.Entity<Product>().HasData(
                new Product
            {
                Id=1,
                Name = "Hanmocla WSP",
                Description = "Thuốc bột uống",
                Type = "Thuốc Kháng Sinh",
                Img = "https://hanvet.com.vn/vn/uploads/HASP/hanmocla%20wsp.jpg",
                Price = 120000
            },
                    new Product
                    {
                        Id = 2,
                        Name = "Tylocoli",
                        Description = "Chuyên trị bệnh đường hô hấp, tiêu hóa.",
                        Type = "Thuốc Kháng Sinh",
                        Img = "https://hanvet.com.vn/vn/uploads/HASP/tylocoli%2020.jpg",
                        Price = 120000
                    },
                    new Product
                    {
                        Id = 3,
                        Name = "TIAMULIN 10%",
                        Description = "Kháng sinh đặc hiệu nhất chữa CRD, suyễn, hồng lỵ.",
                        Type = "Thuốc Kháng Sinh",
                        Img = "https://hanvet.com.vn/vn/uploads/HASP/tiamulin%20100%20g.jpg",
                        Price = 120000
                    },
                    new Product
                    {
                        Id = 4,
                        Name = "HAN-OTIC",
                        Description = "Dung dịch nhỏ tai",
                        Type = "Thuốc Ký Sinh Trùng",
                        Img = "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/S%E1%BA%A3n%20ph%E1%BA%A9m%20cho%20ch%C3%B3%20m%C3%A8o/Han-Otic.JPG",
                        Price = 120000
                    },
                    new Product
                    {
                        Id = 5,
                        Name = "Hanmectin Pour-on",
                        Description = "Thuốc dùng ngoài chuyên dùng đặc trị nội và ngoại ký sinh trùng",
                        Type = "Thuốc Ký Sinh Trùng",
                        Img = "https://www.google.com/imgres?imgurl=http%3A%2F%2Fhanvet.com.vn%2Fvn%2Fuploads%2FHASP%2Fhanmectin-100.jpg&tbnid=us3FuGXTh7WcEM&vet=12ahUKEwif5tv41YaFAxWGka8BHYRQCusQMygBegQIARAx..i&imgrefurl=https%3A%2F%2Fhanvet.com.vn%2Fvn%2Fscripts%2FprodView.asp%3Fidproduct%3D234%26title%3D-page.html&docid=ysCc1Fnu-Wv3kM&w=2344&h=1968&q=H%C3%ACnh%20%E1%BA%A3nh%20Hanmectin%20Pour-on%20hanvet.com&ved=2ahUKEwif5tv41YaFAxWGka8BHYRQCusQMygBegQIARAx",
                        Price = 120000
                    },
                    new Product
                    {
                        Id = 6,
                        Name = "Hanfip-on Plus",
                        Description = "Dung dịch nhỏ giọt điểm da. Diệt ngoại ký sinh trùng",
                        Type = "Thuốc Ký Sinh Trùng",
                        Img = "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/S%E1%BA%A3n%20ph%E1%BA%A9m%20cho%20ch%C3%B3%20m%C3%A8o/Hanfip-on%20Plus.jpg",
                        Price = 120000
                    },

                    new Product
                    {Id = 7,
                        Name = "VẮC XIN LIÊN CẦU LỢN",
                        Description = "Vắc xin nhược độc phòng bệnh Liên cầu khuẩn gây ra ở lợn",
                        Type = "Vắc Xin",
                        Img = "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/anh%20sp%20Vacxin%20lien%20cau%20LON%20DONG%20KHO.png",
                        Price = 120000
                    },

                    new Product
                    {Id = 8,
                        Name = "VẮC XIN TỤ-DẤU-DỊCH TẢ LỢN",
                        Description = "Vắc xin nhược độc phòng 3 bệnh Tụ huyết trùng, Đóng dấu lợn và Dịch tả lợn",
                        Type = "Vắc Xin",
                        Img = "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/tam%20li%C3%AAn.png",
                        Price = 120000
                    },

                    new Product
                    {Id = 9,
                        Name = "VẮC XIN GIẢ DẠI",
                        Description = "Vắc xin nhược độc phòng bệnh Giả dại cho lợn",
                        Type = "Vắc Xin",
                        Img = "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/gia%20dai.png",
                        Price = 120000
                    });
            base.OnModelCreating(modelBuilder);
        }
    }
}
