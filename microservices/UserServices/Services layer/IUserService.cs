using UserServices.Models;

namespace UserServices.Services_layer
{
    public interface IUserService
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
