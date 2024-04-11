using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.ServiceBE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet("getModelDetails")]
        public ModelDetailsdto GetModelDetails(int id)
        {
            var modelDetails = _context.ModelInformations.Find(id);
            var info = _modelBeService.MapModelDetailsToDto(modelDetails);
            return info;
        }
    }
}
