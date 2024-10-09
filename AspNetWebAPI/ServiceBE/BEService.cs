using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Identity.Client;

namespace AspNetCoreAPI.ServiceBE
{
    public interface IBEService
    {
        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models, string path);
        public ModelDetailsdto MapModelDetailsToDto(ModelInformations modelDetails);
        public string GetImagesFromPath(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths);
    }
    public class BEService : IBEService
    {
        private readonly ApplicationDbContext _context;

        public BEService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ApplicationDbContext Context => _context;


        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models, string path)
        {

            return models.Select(models => new Modeldto
            {

                Id = models.Id,
                Name = models.Name,
                Category = models.Category,
                Likes = models.Likes,
                OwnerId = models.OwnerId,
                PicturePath = path,
            }) ;
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
        public string GetImagesFromPath(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths)
        {
            int id = models.Select(models => models.Id).FirstOrDefault();
            var path = _context.ModelImages.Where(paths => paths.ModelId == id).FirstOrDefault();
            //var getFullPath = Path.Combine(Directory.GetCurrentDirectory(), path.ImagePath.ToString()); Assembless full path (but for now unused)
            //var getFullPath = ("C:\\Users\\andre\\source\\repos\\AngularWithAsp_Project_3DLibrary\\AngularWithASP_Project_0.1\\AspNetWebAPI\\Resources\\Images\\336735819_197629953081725_5635585821555488916_n.jpg");
            var directoryPath = ("UploadedImages");
            var getDisplayPath = Path.Combine(directoryPath, path.ImagePath.ToString().Replace("Resources\\Images\\", ""));
            return getDisplayPath;
        }
    }
}
