using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace InventoryServices.Migrations
{
    /// <inheritdoc />
    public partial class DbInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Inventories",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Sales = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventories", x => x.ProductId);
                });

            migrationBuilder.InsertData(
                table: "Inventories",
                columns: new[] { "ProductId", "Quantity", "Sales" },
                values: new object[,]
                {
                    { 1, 100, 0 },
                    { 2, 100, 0 },
                    { 3, 100, 0 },
                    { 4, 100, 0 },
                    { 5, 100, 0 },
                    { 6, 100, 0 },
                    { 7, 100, 0 },
                    { 8, 100, 0 },
                    { 9, 100, 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Inventories");
        }
    }
}
