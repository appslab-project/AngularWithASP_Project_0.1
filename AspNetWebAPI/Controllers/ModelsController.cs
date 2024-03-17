using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.ServiceBE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreAPI.Controllers
{
    [Route("api/[controller]")]
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
            /*return models.Select(models => new Modeldto
            {

                Id = 5,
                Name = "meno",
                Category = "categoria",
                Likes = 66,
                OwnerId = 5,
            });*/
            return _modelBeService.MapModelToDto(models);
        }
    }
}
