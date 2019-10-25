using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RSIVueloAPI.Models;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using RSIVueloAPI.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using RSIVueloAPI.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Antiforgery;

namespace RSIVueloAPI.Controllers
{
    [Authorize]
    [ApiController]
    [AutoValidateAntiforgeryToken]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AppSettings _appSettings;
        private IAntiforgery _antiForgery;

        public UserController(UserService userService,
                              IOptions<AppSettings> appSettings,
                              IAntiforgery antiForgery)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
            _antiForgery = antiForgery;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        [IgnoreAntiforgeryToken]
        public IActionResult Authenticate([FromBody]UserDTO dto)
        {
            var user = _userService.LoginUser(dto.UserName, dto.Password);

            if (dto == null)
                return NotFound();

            // successful login, so generate security checks
            // initialize jwt token w/ values
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // cookie auth
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName)
            };

            var userIdentity = new ClaimsIdentity(claims, "Login");
            ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);

            // cookie settings
            var options = new CookieOptions();
            options.HttpOnly = true;
            options.SameSite = SameSiteMode.Strict;
            options.Secure = true;
            options.Path = "/login";
            options.Expires = DateTime.Now.AddDays(10);
            options.IsEssential = true;
            var random = Guid.NewGuid().ToString();

            Response.Cookies.Append("CookieKey", random, options);

            // generate csrf token w/ values
            var csrf = _antiForgery.GetAndStoreTokens(HttpContext);

            return Ok(new
            {
                Id = user.Id,
                Username = user.UserName,
                Email = user.Email,
                Token = tokenString
            });
        }

        [HttpGet("[action]")]
        public ActionResult<List<User>> GetAllUsers() =>
            _userService.Get();

        [HttpGet("[action]")]
        public ActionResult<User> GetUser(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound);
            return user;
        }

        [AllowAnonymous]
        [HttpPost("[action]")]
        [IgnoreAntiforgeryToken]
        public ActionResult<User> CreateUser(UserDTO user)
        {
            var addedUser = _userService.Create(user);

            if (addedUser == null)
                return StatusCode(StatusCodes.Status409Conflict);

            return Ok(user);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult UpdateUser(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
                return StatusCode(StatusCodes.Status409Conflict);
            _userService.Update(id, userIn);
            return Ok(userIn);
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return StatusCode(StatusCodes.Status404NotFound);

            _userService.Remove(user.Id);
            return Ok(user);
        }

        [HttpPost("[action]")]
        [IgnoreAntiforgeryToken]
        public IActionResult Login(string username, string password)
        {
            var user =_userService.LoginUser(username, password);

            if (user == null) // failed to login
                return StatusCode(StatusCodes.Status401Unauthorized);


            return Ok(user);
        }

        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("CookieKey");
            return NoContent();
        }
    }
}
