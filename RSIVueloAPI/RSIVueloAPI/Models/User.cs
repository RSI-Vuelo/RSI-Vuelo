using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace RSIVueloAPI.Models
{
    [JsonObject]
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement(elementName: "_id")]        
        public string Id { get; set; }

        [BsonElement("username")]
        [JsonProperty("username")]        
        public string UserName { get; set; }

        [BsonElement(elementName: "password")]
        [JsonProperty("password")]
        public string Password { get; set; }

        [BsonElement(elementName: "email")]
        [JsonProperty("email")]
        public string Email { get; set; }

        [BsonElement(elementName: "favorites")]
        [JsonProperty("favorites")]
        public List<string> favorites { get; set; }

        [BsonElement(elementName: "role")]
        [JsonProperty("role")]
        public string Role { get; set; }
    }
}