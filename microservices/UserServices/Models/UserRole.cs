using System.ComponentModel.DataAnnotations.Schema;

namespace UserServices.Models
{
    public class UserRole
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserRoleId { get; set; }
        public string Username { get; set; }
        public int RoleId { get; set; }
    }
}
