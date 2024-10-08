using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Server.IIS.Core;

namespace AspNetCoreAPI.ServiceBE
{
    public interface IBEService
    {
        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models);
        public ModelDetailsdto MapModelDetailsToDto(ModelInformations modelDetails);
        public FormFile GetImagesFromPath(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths);
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

        public ModelDetailsdto MapModelDetailsToDto(ModelInformations modelDetails)
        {

            return  new ModelDetailsdto
            {

                Id = modelDetails.Id,
                Name = modelDetails.Name,
                Category = modelDetails.Category,
                Likes = modelDetails.Likes,
                OwnerId = modelDetails.OwnerId,
                Description = modelDetails.Description
            };
        }
        public FormFile GetImagesFromPath(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths)
        {
            int id = models.Select(models => models.Id).FirstOrDefault();
            IEnumerable<ModelImages> path = _context.ModelImages.Where(path => path.ModelId == id);
            return null;
        }
    }
}
