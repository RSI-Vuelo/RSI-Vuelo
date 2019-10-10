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

namespace RSIVueloAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet("[action]")]
        public ActionResult<List<User>> GetAllUsers() =>
            _userService.Get();

        [HttpGet("[action]")]
        public ActionResult<User> GetUser([FromForm]string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();
            return user;
        }

        [HttpPost("[action]")]
        public ActionResult<User> CreateUser(User user)
        {
            _userService.Create(user);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult UpdateUser(string id, [FromForm]User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();

            _userService.Update(id, userIn);
            return Ok(user);
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult DeleteUser(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();

            _userService.Remove(user.Id);
            return Ok(user);
        }

        [HttpPost("[action]")]
        public IActionResult Login([FromForm]string username, [FromForm] string password)
        {
            var user =_userService.LoginUser(username, password);
            if (user == null)
            {
                return NotFound(user);
            }

            return Ok(user);
        }
    }
}
