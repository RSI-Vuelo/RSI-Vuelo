using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RSIVueloAPI.Models
{
    // mimics BlackHawk structure in Helicopter.java
    public class BlackHawk : Helicopter
    {
        public int MaxPassengers { get; set; }
        public double AirSpeed { get; set; }
        public bool TwinEngine { get; set; }
        public string Guns { get; set; }
        public string Missles { get; set; }
    }
}