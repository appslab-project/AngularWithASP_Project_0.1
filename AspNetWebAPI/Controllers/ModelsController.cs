using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.ServiceBE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace AspNetCoreAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ModelsController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly IBEService _modelBeService;

        public ModelsController(ApplicationDbContext context, IBEService modelBeService)
        {
            _context = context;
            _modelBeService = modelBeService;

        }

        [HttpGet("getModel")]
        public IEnumerable<Modeldto> GetModels()
        {
            IEnumerable<ModelInformations> models = _context.ModelInformations;
            return _modelBeService.MapModelToDto(models);
        }
        [HttpGet("getMyModel")]
        public IEnumerable<Modeldto> GetMyModels(string id)
        {
        
            IEnumerable<ModelInformations> models = _context.ModelInformations.Where(model => model.OwnerId == id);


            return _modelBeService.MapModelToDto(models);
        }

        [HttpGet("getModelDetails")]
        public ModelDetailsdto GetModelDetails(int id)
        {
            var modelDetails = _context.ModelInformations.Find(id);
            var info = _modelBeService.MapModelDetailsToDto(modelDetails);
            return info;
        }
        [HttpPut("createModel")]

        public IEnumerable<Modeldto> CreateModel(string modelName, string category, string description, string ownerId) 
        {
            IEnumerable<ModelInformations> models = _context.ModelInformations;
            var info = new ModelInformations
            {

                Name = modelName,
                Category = category,
                Description = description,
                OwnerId = ownerId,


            };
            _context.Add(info);
            _context.SaveChanges();

            return _modelBeService.MapModelToDto(models);
        }
        [HttpPut("deleteModel")]
        public IEnumerable<Modeldto> DeleteModel(int id, string ownerId)
        {

            IEnumerable<ModelInformations> models = _context.ModelInformations.Where(xmodel => xmodel.OwnerId == ownerId); ;

            var model = _context.ModelInformations.Find(id);
            if (model == null)
            {
                return null;
            }
            _context.Remove(model);
            _context.SaveChanges();
            return _modelBeService.MapModelToDto(models);
        }

    }
}
