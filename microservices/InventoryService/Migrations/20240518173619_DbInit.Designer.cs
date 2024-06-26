﻿// <auto-generated />
using InventoryServices.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace InventoryServices.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20240518173619_DbInit")]
    partial class DbInit
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("InventoryServices.Models.Inventory", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ProductId"));

                    b.Property<int>("Quantity")
                        .HasColumnType("int");

                    b.Property<int>("Sales")
                        .HasColumnType("int");

                    b.HasKey("ProductId");

                    b.ToTable("Inventories");

                    b.HasData(
                        new
                        {
                            ProductId = 1,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 2,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 3,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 4,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 5,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 6,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 7,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 8,
                            Quantity = 100,
                            Sales = 0
                        },
                        new
                        {
                            ProductId = 9,
                            Quantity = 100,
                            Sales = 0
                        });
                });
#pragma warning restore 612, 618
        }
    }
}
