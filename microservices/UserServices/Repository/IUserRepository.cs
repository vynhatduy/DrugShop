using UserServices.Models;

namespace UserServices.Repository
{
    public interface IUserRepository
    {
        Task<List<AdminUserModel>> GetAll();
        Task<bool> AdminCreate(AdminCreateModel model);
        Task<bool> AdminUpdate(AdminUserModel user);
        Task<bool> AddUserAsync(UserModel user);
        Task<bool> DeleteUserAsync(string Username);
        Task<bool> UpdateUserAsync(UserModel user);
        Task<bool> ValidateUserCredentialsAsync(string username, string password);
        Task<Role> GetUserRolesAsync(string Username);
    }
}
