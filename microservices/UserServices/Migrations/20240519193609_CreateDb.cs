using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace UserServices.Migrations
{
    /// <inheritdoc />
    public partial class CreateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "Uu2FV9A03SzmTmsSK9fO23JoPAKYzlT3C2FnZTl9am0=", "gQ7MxCcdwvT5/5Y2GjmHTg==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "B9niwJgKEYL+wTAU0L2Ixl2TzYn6gL3yJvf0WZ3ba8E=", "PHVisrRh6CgpNITURfbqAg==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "1yCt+eTOrurrpw9F5DaivQqeGltj31IWmj5h5C+GUAo=", "QV9JAbYyy+Jhmx3RZTd16g==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 1,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "417jXAymYami5K2I9KfWZ8VIRwDGLL6uHY1O4k9oDgo=", "cPHcz1XNjeym6ge5ayqYHg==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 2,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "MmT0YLSPRI0rWOKytioJRI+gHYDAfIXy02eX/cmLr1Y=", "UZe4ZBHvOlFXigygPAbW0A==" });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserId",
                keyValue: 3,
                columns: new[] { "PasswordHash", "PasswordSalt" },
                values: new object[] { "OIQNbRMlWLhX12Q5n7lIIpUxIa5iNePc5y97VnFThC4=", "R50aG5p577nwfhTdcwaoxg==" });
        }
    }
}
