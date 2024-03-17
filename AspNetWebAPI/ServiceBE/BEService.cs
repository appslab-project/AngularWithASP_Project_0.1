using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;

namespace AspNetCoreAPI.ServiceBE
{
    public interface IBEService
    {
        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models);
    }
    public class BEService : IBEService
    {
        private readonly ApplicationDbContext _context;

        public BEService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ApplicationDbContext Context => _context;


        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models)
        {

            return models.Select(models => new Modeldto
            {

                Id = models.Id,
                Name = models.Name,
                Category = models.Category,
                Likes = models.Likes,
                OwnerId = models.OwnerId,
            });
        }
    }
}
