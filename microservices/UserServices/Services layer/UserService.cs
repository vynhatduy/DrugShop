using UserServices.Models;
using UserServices.Repository;

namespace UserServices.Services_layer
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<List<AdminUserModel>> GetAll()
        {
            return await _userRepository.GetAll();
        }
        public async Task<bool> AdminCreate(AdminCreateModel model)
        {
            return await _userRepository.AdminCreate(model);
        }
        public async Task<bool> AdminUpdate(AdminUserModel user)
        {
            return await _userRepository.AdminUpdate(user);
        }
        public async Task<bool> AddUserAsync(UserModel user)
        {
            return await _userRepository.AddUserAsync(user);
        }

        public async Task<bool> DeleteUserAsync(string Username)
        {
            return await _userRepository.DeleteUserAsync(Username);
        }

        public async Task<bool> UpdateUserAsync(UserModel user)
        {
            return await _userRepository.UpdateUserAsync(user);
        }

        public async Task<bool> ValidateUserCredentialsAsync(string username, string password)
        {
            return await _userRepository.ValidateUserCredentialsAsync(username, password);
        }

        public async Task<Role> GetUserRolesAsync(string Username)
        {
            return await _userRepository.GetUserRolesAsync(Username);
        }
    }
}
