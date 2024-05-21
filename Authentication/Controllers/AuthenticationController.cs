using Authentication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration config;
        private readonly HttpClient _userService;

        public AuthenticationController(IConfiguration config, IHttpClientFactory factory)
        {
            this.config = config;
            _userService = factory.CreateClient();
            _userService.BaseAddress = new System.Uri("http://localhost:8301/api/");

        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                var jsonModel = Newtonsoft.Json.JsonConvert.SerializeObject(model); // Sử dụng JsonConvert từ thư viện Newtonsoft.Json
                var content = new StringContent(jsonModel, Encoding.UTF8, "application/json");

                var response = await _userService.PostAsync("User/login", content);

                if (response.IsSuccessStatusCode)
                {
                    var responseContent = await response.Content.ReadAsStringAsync();
                    var userData = Newtonsoft.Json.JsonConvert.DeserializeObject<UserRespone>(responseContent); // Sử dụng DeserializeObject từ thư viện Newtonsoft.Json
                    var tokenString = GenerateJWTWebToken(userData.Username, userData.Role);

                    if (string.IsNullOrEmpty(tokenString))
                    {
                        return Unauthorized("Không thể tạo chuỗi xác thực người dùng");
                    }

                    return Ok(new { token = tokenString });
                }
                else
                {
                    return Unauthorized("Tài khoản hoặc mật khẩu không đúng");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                return BadRequest();
            }
        }

        private string GenerateJWTWebToken(string username, string role)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(config["Jwt:Secret"]));
                var cendentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(config["Jwt:Issuer"],
                    config["Jwt:Issuer"],
                    new Claim[]
                    {
                    new Claim(ClaimTypes.Name,username),
                    new Claim(ClaimTypes.Role,role)
                    },
                    expires: DateTime.Now.AddMinutes(20),
                    signingCredentials: cendentials);
                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }
        }
    }
}
