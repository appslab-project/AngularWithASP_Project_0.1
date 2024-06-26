﻿using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class ModelInformations
    {

        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Category { get; set; }
        public string OwnerId { get; set; }
        public int Likes { get; set; }
        public string? ImagePath { get; set; }
        public string? FilePath { get; set; }
    }
}
