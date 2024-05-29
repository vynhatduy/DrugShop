namespace UserServices.Models
{
    public class AdminCreateModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public int RoleId { get; set; }
    }
}
