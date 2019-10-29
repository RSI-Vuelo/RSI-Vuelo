using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace RSIVueloAPI.Models
{
    // mimics Helicopter stucture in Helicopter.java
    public class Helicopter
    {
        public string Type { get; set; }
        public string Model { get; set; }
        public double CapacityWeight { get; set; }
        public double CrewMax { get; set; }
        public double CrewMin { get; set; }
        public double FuselageLength { get; set; }
        public double Height { get; set; }
        public double RotorDiameter { get; set; }
    }
}