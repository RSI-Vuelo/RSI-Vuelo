using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace RSIVueloAPI.Models
{
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
        public string Password { get; set; }
        [BsonElement(elementName: "email")]
        public string Email { get; set; }
        [BsonElement(elementName: "favorites")]
        public List<string> favorites { get; set; }
        [BsonElement(elementName: "role")]
        public string Role { get; set; }
    }
}