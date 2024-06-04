using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class ModelImages
    {

        [Key]
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ImagePath { get; set; }

    }
}
