﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using UserServices.Models;

#nullable disable

namespace UserServices.Migrations
{
    [DbContext(typeof(MyDbContext))]
    [Migration("20240518174358_DbInit")]
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

            modelBuilder.Entity("UserServices.Models.Role", b =>
                {
                    b.Property<int>("RoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("RoleId"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("RoleId");

                    b.ToTable("Roles");

                    b.HasData(
                        new
                        {
                            RoleId = 1,
                            Name = "Admin"
                        },
                        new
                        {
                            RoleId = 2,
                            Name = "Manager"
                        },
                        new
                        {
                            RoleId = 3,
                            Name = "User"
                        });
                });

            modelBuilder.Entity("UserServices.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Address = "Da Lat",
                            Name = "Admin",
                            PasswordHash = "ZRJf1Way4qJqv6nxKE9SktOQad7vbfcrhHgZfeGMj0A=",
                            PasswordSalt = "6s286X+Jf0iYJZgU312kyQ==",
                            Username = "admin"
                        },
                        new
                        {
                            UserId = 2,
                            Address = "Da Lat",
                            Name = "Manager",
                            PasswordHash = "zFYiAnxAwJPS1eTqG/AhTHQQaKDorIR6K5ldhmNDDdc=",
                            PasswordSalt = "bBVxSL3zVQp1L5seTcq+2w==",
                            Username = "manager"
                        },
                        new
                        {
                            UserId = 3,
                            Address = "Da Lat",
                            Name = "User",
                            PasswordHash = "ewREdq3F7gAu52qulnQwtyrYvU5jpF3zRFmSQ+dfmKg=",
                            PasswordSalt = "0mtKDZ5uIUorpXbRh6tq0Q==",
                            Username = "user"
                        });
                });

            modelBuilder.Entity("UserServices.Models.UserRole", b =>
                {
                    b.Property<int>("UserRoleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserRoleId"));

                    b.Property<int>("RoleId")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("UserRoleId");

                    b.ToTable("UserRoles");

                    b.HasData(
                        new
                        {
                            UserRoleId = 1,
                            RoleId = 1,
                            UserId = 1
                        },
                        new
                        {
                            UserRoleId = 2,
                            RoleId = 2,
                            UserId = 2
                        },
                        new
                        {
                            UserRoleId = 3,
                            RoleId = 3,
                            UserId = 3
                        });
                });
#pragma warning restore 612, 618
        }
    }
}