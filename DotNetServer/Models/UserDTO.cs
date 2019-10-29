using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSIVueloAPI.Models
{
    public class UserDTO
    {
        [JsonProperty("_id")]
        public string Id { get; set; }

        [JsonProperty("username")]
        public string UserName { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("favorites")]
        public List<string> favorites { get; set; }

        [JsonProperty("role")]
        public string Role { get; set; }
    }
}
