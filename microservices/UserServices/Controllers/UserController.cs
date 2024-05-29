using Microsoft.AspNetCore.Mvc;
using UserServices.Models;
using UserServices.Services_layer;

namespace UserServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            var item = await _userService.GetAll();
            return Ok(item);
        }
        [HttpPost("admin/{username}")]
        public async Task<ActionResult> AdminCreate(AdminCreateModel model)
        {
            var result=await _userService.AdminCreate(model);
            return result ? Ok() : BadRequest();
        }
        
        [HttpPut("admin/{username}")]
        public async Task<ActionResult> AdminUpdate(AdminUserModel model)
        {
            var result=await _userService.AdminUpdate(model);
            return result ? Ok() : BadRequest();
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> RegisterUser(UserModel user)
        {
            var registeredUser = await _userService.AddUserAsync(user);
            if (registeredUser)
            {
            return Ok();
            }
            return BadRequest();
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserRespone>> Login(LoginModel model)
        {
            
            var isValid = await _userService.ValidateUserCredentialsAsync(model.Username, model.Password);
            if (!isValid)
            {
                return Unauthorized();
            }
            var role = await _userService.GetUserRolesAsync(model.Username);
            if (role != null)
            {
                UserRespone respone = new UserRespone
                {
                    Username = model.Username,
                    Role = role.Name
                };
                return Ok(respone);
            }
            return BadRequest();
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<User>> GetUserByUsername(string username)
        {
            var user = await _userService.GetUserRolesAsync(username);
            if (user == null)
                return NotFound();

            return Ok(user);
        }
        [HttpDelete("{username}")]
        public async Task<ActionResult> Delete(string username)
        {
            var result = await _userService.DeleteUserAsync(username);
            if (result)
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}
