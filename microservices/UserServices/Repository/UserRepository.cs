using Microsoft.EntityFrameworkCore;
using UserServices.Helper;
using UserServices.Models;

namespace UserServices.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _context;

        public UserRepository(MyDbContext context)
        {
            _context = context;
        }

        public async Task<List<AdminUserModel>> GetAll()
        {
            try
            {
                var ds = new List<AdminUserModel>();
                var item = await _context.Users.ToListAsync();
                foreach(var i in item)
                {
                    var role = await _context.UserRoles.FirstOrDefaultAsync(x=>x.Username==i.Username);
                    if (role != null)
                    {
                        ds.Add(new AdminUserModel
                        {
                            UserId = i.UserId,
                            Name = i.Name,
                            Address = i.Address,
                            PasswordHash = i.PasswordHash,
                            PasswordSalt = i.PasswordSalt,
                            Username = i.Username,
                            RoleId = role.RoleId
                        });
                    }
                }
                return ds;
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
                return null;
            }
        }
        
        public async Task<bool> AdminCreate(AdminCreateModel model)
        {
            try
            {
                var itemUser=await _context.Users.FirstOrDefaultAsync(x=>x.Username== model.Username);
                var itemUserRole=await _context.UserRoles.FirstOrDefaultAsync(x=>x.Username== model.Username);
                if(itemUser!=null || itemUserRole!=null) return false;
                var hash = HasherPassword.HashPass(model.Password.ToString().Trim());
                _context.Users.Add(new User
                {
                    Address=model.Address,
                    Name=model.Name,
                    PasswordHash = hash["password"],
                    PasswordSalt = hash["salt"],
                    Username=model.Username
                });
                _context.UserRoles.Add(new UserRole
                {
                    Username=model.Username,
                    RoleId=model.RoleId
                });
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
        }
        public async Task<bool> AdminUpdate(AdminUserModel user)
        {
            try
            {
                var itemUser=await _context.Users.FirstOrDefaultAsync(x=>x.Username== user.Username);
                var itemUserRole=await _context.UserRoles.FirstOrDefaultAsync(x=>x.Username== user.Username);
                if(itemUser==null || itemUserRole==null) return false;
                itemUser.Address = user.Address;
                itemUser.Name = user.Name;
                itemUserRole.RoleId=user.RoleId;
                _context.Users.Update(itemUser);
                _context.UserRoles.Update(itemUserRole);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
        }
        public async Task<bool> AddUserAsync(UserModel user)
        {
            try
            {
                var item=await _context.Users.FirstOrDefaultAsync(x=>x.Username== user.Username);
                if(item!=null)
                {
                    return false;
                }
                var hashedPassword = HasherPassword.HashPass(user.Password.Trim().ToString());
                if (hashedPassword != null)
                {
                    var newUser = new User
                    {
                        Username = user.Username,
                        PasswordHash = hashedPassword["password"],
                        PasswordSalt = hashedPassword["salt"],
                        Name = user.Name,
                        Address = user.Address
                    };
                    var newUserRole = new UserRole
                    {
                        Username = newUser.Username,
                        RoleId = 3
                    };
                    _context.Users.Add(newUser);
                    _context.UserRoles.Add(newUserRole);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    // Handle hashing error
                    return false;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return false;
            }
        }

        public async Task<bool> DeleteUserAsync(string Username)
        {
            var userRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.Username == Username);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == Username);
            if (user == null&&userRole==null)
                return false;

            _context.UserRoles.Remove(userRole);
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUserAsync(UserModel user)
        {
            try
            {
                var hasherpass = HasherPassword.HashPass(user.Password.Trim().ToString());
                var itemUser=await _context.Users.FirstOrDefaultAsync(x=>x.Username == user.Username);
                
                if (itemUser == null)
                {
                    await Console.Out.WriteLineAsync("Người dùng không tồn tại");
                    return false;
                }
                var itemUserRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.Username == itemUser.Username);
                if (itemUserRole == null)
                {
                    await Console.Out.WriteLineAsync("Tài khoản không tồn tại");
                    return false;
                }
                itemUser.PasswordHash = hasherpass["password"];
                itemUser.PasswordSalt = hasherpass["salt"];
                itemUser.Name=user.Name;
                itemUser.Address = user.Address;

                _context.Users.Update(itemUser);
                await _context.SaveChangesAsync();
                return true;
            }
            catch(Exception e)
            {
                await Console.Out.WriteLineAsync(e.Message);
                return false;
            }
            
        }

        public async Task<bool> ValidateUserCredentialsAsync(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
            if (user == null)
                return false;

            var hasherpass=HasherPassword.CheckHashPass(password.Trim().ToString(), user.PasswordSalt.Trim().ToString());
            if (hasherpass.Trim().ToString() == user.PasswordHash.Trim().ToString())
                return true;
            return false; 
        }

        public async Task<Role> GetUserRolesAsync(string Username)
        {
            var item = await _context.Users.FirstOrDefaultAsync(x => x.Username == Username);
            if (item != null)
            {
                var userRole = await _context.UserRoles.FirstOrDefaultAsync(x => x.Username == item.Username);
                if(userRole != null)
                {
                    var role = await _context.Roles.FirstOrDefaultAsync(x => x.RoleId == userRole.RoleId);
                    return role;
                }
                return null;
            }
            return null;
        }
    }
}
