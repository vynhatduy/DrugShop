using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace product_services.Migrations
{
    /// <inheritdoc />
    public partial class DbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Img = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Description", "Img", "Name", "Price", "Type" },
                values: new object[,]
                {
                    { 1, "Thuốc bột uống", "https://hanvet.com.vn/vn/uploads/HASP/hanmocla%20wsp.jpg", "Hanmocla WSP", 120000.0, "Thuốc Kháng Sinh" },
                    { 2, "Chuyên trị bệnh đường hô hấp, tiêu hóa.", "https://hanvet.com.vn/vn/uploads/HASP/tylocoli%2020.jpg", "Tylocoli", 120000.0, "Thuốc Kháng Sinh" },
                    { 3, "Kháng sinh đặc hiệu nhất chữa CRD, suyễn, hồng lỵ.", "https://hanvet.com.vn/vn/uploads/HASP/tiamulin%20100%20g.jpg", "TIAMULIN 10%", 120000.0, "Thuốc Kháng Sinh" },
                    { 4, "Dung dịch nhỏ tai", "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/S%E1%BA%A3n%20ph%E1%BA%A9m%20cho%20ch%C3%B3%20m%C3%A8o/Han-Otic.JPG", "HAN-OTIC", 120000.0, "Thuốc Ký Sinh Trùng" },
                    { 5, "Thuốc dùng ngoài chuyên dùng đặc trị nội và ngoại ký sinh trùng", "https://www.google.com/imgres?imgurl=http%3A%2F%2Fhanvet.com.vn%2Fvn%2Fuploads%2FHASP%2Fhanmectin-100.jpg&tbnid=us3FuGXTh7WcEM&vet=12ahUKEwif5tv41YaFAxWGka8BHYRQCusQMygBegQIARAx..i&imgrefurl=https%3A%2F%2Fhanvet.com.vn%2Fvn%2Fscripts%2FprodView.asp%3Fidproduct%3D234%26title%3D-page.html&docid=ysCc1Fnu-Wv3kM&w=2344&h=1968&q=H%C3%ACnh%20%E1%BA%A3nh%20Hanmectin%20Pour-on%20hanvet.com&ved=2ahUKEwif5tv41YaFAxWGka8BHYRQCusQMygBegQIARAx", "Hanmectin Pour-on", 120000.0, "Thuốc Ký Sinh Trùng" },
                    { 6, "Dung dịch nhỏ giọt điểm da. Diệt ngoại ký sinh trùng", "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/S%E1%BA%A3n%20ph%E1%BA%A9m%20cho%20ch%C3%B3%20m%C3%A8o/Hanfip-on%20Plus.jpg", "Hanfip-on Plus", 120000.0, "Thuốc Ký Sinh Trùng" },
                    { 7, "Vắc xin nhược độc phòng bệnh Liên cầu khuẩn gây ra ở lợn", "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/anh%20sp%20Vacxin%20lien%20cau%20LON%20DONG%20KHO.png", "VẮC XIN LIÊN CẦU LỢN", 120000.0, "Vắc Xin" },
                    { 8, "Vắc xin nhược độc phòng 3 bệnh Tụ huyết trùng, Đóng dấu lợn và Dịch tả lợn", "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/tam%20li%C3%AAn.png", "VẮC XIN TỤ-DẤU-DỊCH TẢ LỢN", 120000.0, "Vắc Xin" },
                    { 9, "Vắc xin nhược độc phòng bệnh Giả dại cho lợn", "https://hanvet.com.vn/uploads/S%E1%BA%A3n%20ph%E1%BA%A9m/v%E1%BA%AFc%20xin/Gia%20s%C3%BAc/gia%20dai.png", "VẮC XIN GIẢ DẠI", 120000.0, "Vắc Xin" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
