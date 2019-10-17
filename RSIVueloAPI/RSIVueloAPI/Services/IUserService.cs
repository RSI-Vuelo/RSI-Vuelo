using RSIVueloAPI.Models;
using System.Collections.Generic;

namespace RSIVueloAPI.Services
{
    public interface IUserService
    {
        List<User> Get();
        User Get(string id);
        User Create(UserDTO user);
        void Update(string id, User userIn, string password);
        void Remove(User userIn);
        void Remove(string id);
        User LoginUser(string username, string password);

    }
}