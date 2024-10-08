namespace AspNetCoreAPI.Authentication.dto
{
    public class Modeldto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public int Likes { get; set; }

        public string OwnerId { get; set; }
        public FormFile Obrazok { get ; set; }
    }
}
