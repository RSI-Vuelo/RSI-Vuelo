using MongoDB.Driver;
using RSIVueloAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSIVueloAPI.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IUserDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var db = client.GetDatabase(settings.DatabaseName);

            _users = db.GetCollection<User>(settings.UserCollectionName);
        }

        public List<User> Get() =>
            _users.Find(user => true).ToList();

        public User Get(string id) =>
            _users.Find<User>(user => user.Id == id).FirstOrDefault();

        public User Create(User user)
        {
            // all newly created users will have 'user' role, empty favorites list and [id] attribute set by MongoDB
            user.Role = "user";
            user.favorites = new List<string>();
            user.Id = null;
            if (_users.Find(x => x.UserName.Equals(user.UserName)).Any()) // true if dupe user is found, otherwise false
                return null;
            
            _users.InsertOne(user);
            return user;
        }

        public void Update(string id, User userIn)
        {
            // don't allow users to be updated to admin and edit [id] attribute
            userIn.Role = "user";
            userIn.Id = id;
            _users.ReplaceOne(user => user.Id == id, userIn);
        }

        public void Remove(User userIn) =>
            _users.DeleteOne(user => user.Id == userIn.Id);

        public void Remove(string id) =>
            _users.DeleteOne(user => user.Id == id);

        public User LoginUser(string username, string password)
        {
            User user = _users.Find(x => x.UserName.Equals(username)).FirstOrDefault();

            if (user != null && user.Password.Equals(password))
                return user;           
            else // user not found or wrong password
                return null;
        }
    }
}
