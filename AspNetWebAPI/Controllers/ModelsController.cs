using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.ServiceBE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net.Http.Headers;

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

        [HttpPost ("uploadImage")] 
        [DisableRequestSizeLimit]
        public ActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                int modelId = Int32.Parse(Request.Form["modelId"]); 
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    IEnumerable<ModelImages> models = _context.ModelImages;
                    var cesta = new ModelImages
                    {

                        ImagePath = dbPath,
                        ModelId = modelId,

                    };
                    _context.Add(cesta);
                    _context.SaveChanges();
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }


        [HttpPost("uploadFile")]
        [DisableRequestSizeLimit]
        public IActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Models");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

    }
}
