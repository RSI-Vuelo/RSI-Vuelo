﻿using System;
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

namespace RSIVueloAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        private readonly AppSettings _appSettings;

        public UserController(UserService userService,
                              IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("Authenticate")]
        public IActionResult Authenticate([FromBody]UserDTO dto)
        {
            var user = _userService.LoginUser(dto.UserName, dto.Password);

            if (dto == null)
                return NotFound();

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
            var options = new CookieOptions();
            options.HttpOnly = true;
            options.SameSite = SameSiteMode.Strict;
            options.Secure = true;
            options.Path = "/login";
            options.Expires = DateTime.Now.AddDays(10);
            options.IsEssential = true; // don't know if need this
            Response.Cookies.Append("key", "value", options);
            
           // Task.Run(async () => await HttpContext.Authentication.SignInAsync("CookieAuthentication", principal)).RunSynchronously();
           // Task.Run(async () => await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignInAsync(
           //     , principal)).RunSynchronously();

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
        public ActionResult<User> CreateUser(UserDTO user)
        {
            //User serialUser = (User) JsonConvert.DeserializeObject(user);
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
        public IActionResult Login(string username, string password)
        {
            var user =_userService.LoginUser(username, password);
            if (user != null) // user failed to login
                return StatusCode(StatusCodes.Status401Unauthorized);
            return Ok(user);
        }

        [HttpGet("[action]")]
        public IActionResult Logout()
        {
            //Task authCheck = null;
            //Task.Run(async () => await HttpContext.Authentication.SignOutAsync("CookieAuthentication")).RunSynchronously();
            //Task.Run(async () => await Microsoft.AspNetCore.Authentication.AuthenticationHttpContextExtensions.SignOutAsync(
            //    ).RunSynchronously();
            Response.Cookies.Delete("key");
            return Ok();
        }
    }
}
