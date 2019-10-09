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
       // [Route("~/GetAllUsers")]
        public ActionResult<List<User>> GetAllUsers() =>
            _userService.Get();

        //[HttpGet("{id:length(24)}", Name = "GetUser")]
        [HttpGet("[action]")]
        //[HttpGet("~/GetUser")]
        public ActionResult<User> GetUser(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();
            return user;
        }

        [HttpPost("[action]")]
        public ActionResult<User> CreateUser([FromForm]User user) 
        {
            var temp = user;
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user.Id, user });
            //return user;
        }

        //[HttpPut("{id:length(24)}")]
        [HttpPut]
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();

            _userService.Update(id, userIn);
            return NoContent();
        }

        //[HttpDelete("{id:length(24)}")]
        [HttpDelete]
        public IActionResult Delete(string id)
        {
            var user = _userService.Get(id);

            if (user == null)
                return NotFound();

            _userService.Remove(user.Id);
            return NoContent();
        }

        // GET: api/User
        /*([HttpGet]
        //[Route("api/User/values")]
        public List<User> GetAll()
        {
            return users;
        }*/



        // GET: api/User/5
        /*[HttpGet("{id}", Name = "Get")]
        public ActionResult Get(int id)
        {
            var product = users.FirstOrDefault(u => u.Id == id);
            if (product == null)
                return NotFound();
            return Ok(product);
        }*/

        /*// POST: api/User
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
