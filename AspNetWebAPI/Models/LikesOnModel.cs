using System.ComponentModel.DataAnnotations;

namespace AspNetCoreAPI.Models
{
    public class LikesOnModel
    {
        [Key]
        public int Id { get; set; }
        public int ModelId { get; set; }
        public string? UserId { get; set; }
    }
}
