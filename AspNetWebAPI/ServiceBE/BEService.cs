using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using Microsoft.AspNetCore.Server.IIS.Core;
using Microsoft.Identity.Client;
using System.Dynamic;

namespace AspNetCoreAPI.ServiceBE
{
    public interface IBEService
    {
        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths);
        public ModelDetailsdto MapModelDetailsToDto(ModelInformations modelDetails, IEnumerable<ModelImages> paths);
        public string GetImagesFromPath(int models, IEnumerable<ModelImages> paths);
    }
    public class BEService : IBEService
    {
        private readonly ApplicationDbContext _context;

        public BEService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ApplicationDbContext Context => _context;



        public IEnumerable<Modeldto> MapModelToDto(IEnumerable<ModelInformations> models, IEnumerable<ModelImages> paths)
        {

            return models.Select(models => new Modeldto
            { 

                Id = models.Id,
                Name = models.Name,
                Category = models.Category,
                Likes = models.Likes,
                OwnerId = models.OwnerId,
                PicturePath = this.GetImagesFromPath(models.Id, paths),
                
            }) ;
        }

        public ModelDetailsdto MapModelDetailsToDto(ModelInformations modelDetails, IEnumerable<ModelImages> paths)
        {

            return  new ModelDetailsdto
            {

                Id = modelDetails.Id,
                Name = modelDetails.Name,
                Category = modelDetails.Category,
                Likes = modelDetails.Likes,
                OwnerId = modelDetails.OwnerId,
                Description = modelDetails.Description,
                PicturePath = this.GetImagesFromPath(modelDetails.Id, paths)
            };
        }
        public string GetImagesFromPath(int modelId, IEnumerable<ModelImages> paths)
        {
            if (paths != null) {
                IEnumerable<ModelImages> path = _context.ModelImages.Where(paths => paths.ModelId == modelId);
                string getDisplayPath = "";
                foreach (ModelImages image in path)
                {
                    string notFinishedPath = image.ImagePath.ToString();
                    var directoryPath = ("UploadedImages");
                    getDisplayPath = Path.Combine(directoryPath, notFinishedPath.Replace("Resources\\Images\\", ""));
                }
                return getDisplayPath;
            }
            else
            {
                return null;
            }


            //var getFullPath = Path.Combine(Directory.GetCurrentDirectory(), path.ImagePath.ToString()); Assembless full path (but for now unused)
            //var getFullPath = ("C:\\Users\\andre\\source\\repos\\AngularWithAsp_Project_3DLibrary\\AngularWithASP_Project_0.1\\AspNetWebAPI\\Resources\\Images\\336735819_197629953081725_5635585821555488916_n.jpg");


        }
    }
}
