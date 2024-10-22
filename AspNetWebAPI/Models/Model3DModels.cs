using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class Model3DModels
    {
        [Key]
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? ModelPath { get; set; }

    }
}
