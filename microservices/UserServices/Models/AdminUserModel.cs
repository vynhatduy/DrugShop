namespace UserServices.Models
{
    public class AdminUserModel
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }
    }
}
