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
        public User(UserDTO dto)
        {
            Id = dto.Id;
            UserName = dto.UserName;
            Email = dto.Email;
            favorites = dto.favorites;
            Role = dto.Role;
        }

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BsonElement(elementName: "_id")]        
        public string Id { get; set; }

        [BsonElement("username")]    
        public string UserName { get; set; }


        [BsonElement(elementName: "passwordHash")]
        public byte[] PasswordHash { get; set; }

        [BsonElement(elementName: "passwordSalt")]
        public byte[] PasswordSalt { get; set; }

        [BsonElement(elementName: "email")]
        public string Email { get; set; }

        [BsonElement(elementName: "favorites")]
        public List<string> favorites { get; set; }

        [BsonElement(elementName: "role")]
        public string Role { get; set; }
    }
}