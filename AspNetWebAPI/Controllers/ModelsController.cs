using AspNetCoreAPI.Authentication.dto;
using AspNetCoreAPI.Data;
using AspNetCoreAPI.Migrations;
using AspNetCoreAPI.Models;
using AspNetCoreAPI.ServiceBE;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Immutable;
using System.Net.Http.Headers;
using System.Security.Claims;

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

        protected User? GetCurrentUser()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);

            return _context.Users.SingleOrDefault(user => user.UserName == userName);
        }

        [HttpGet("getModel")]
        public IEnumerable<Modeldto> GetModels()
        {
            IEnumerable<ModelInformations> models = _context.ModelInformations;
            IEnumerable<Models.ModelImages> paths = _context.ModelImages;
            return _modelBeService.MapModelToDto(models, paths);
            //string test = GetCurrentUser().Id;
        }
        [HttpGet("getMyModel")]
        public IEnumerable<Modeldto> GetMyModels()
        {
        
            IEnumerable<ModelInformations> models = _context.ModelInformations.Where(model => model.OwnerId == GetCurrentUser().Id);
            IEnumerable<Models.ModelImages> paths = _context.ModelImages;
            return _modelBeService.MapModelToDto(models, paths);
        }

        [HttpGet("getModelDetails")]
        public ModelDetailsdto GetModelDetails(int id)
        {
            var modelDetails = _context.ModelInformations.Find(id);
            IEnumerable<Models.ModelImages> paths = _context.ModelImages;
            IEnumerable<Models.Model3DModels> modelPaths = _context.Model3DModels;
            var info = _modelBeService.MapModelDetailsToDto(modelDetails, paths, modelPaths);
            return info;
        }
        [HttpPut("createModel")]

        public int CreateModel(string modelName, string category, string description) 
        {
            IEnumerable<ModelInformations> models = _context.ModelInformations;
            IEnumerable<Models.ModelImages> paths = _context.ModelImages;
            var info = new ModelInformations
            {

                Name = modelName,
                Category = category,
                Description = description,
                OwnerId = GetCurrentUser().Id,


            };
            _context.Add(info);
            _context.SaveChanges();

            int currentId = models.Last().Id;
            return currentId;
        }
        [HttpPut("deleteModel")]
        public IEnumerable<Modeldto> DeleteModel(int id)
        {

            IEnumerable<ModelInformations> models = _context.ModelInformations.Where(xmodel => xmodel.OwnerId == GetCurrentUser().Id); ;
            IEnumerable<Models.ModelImages> paths = _context.ModelImages;
            var model = _context.ModelInformations.Find(id);
            if (model == null)
            {
                return null;
            }
            _context.Remove(model);
            _context.SaveChanges();
            return _modelBeService.MapModelToDto(models, paths);
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

                  //  IEnumerable<ModelImages> models = _context.ModelImages;
                    var cesta = new Models.ModelImages
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
        public ActionResult UploadFile()
        {
            try
            {
                var file = Request.Form.Files[0];
                int modelId = Int32.Parse(Request.Form["modelId"]);
                var folderName = Path.Combine("Resources", "Models");
                var pathToSave =  Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    //IEnumerable<ModelInformations> models = _context.ModelInformations.Find(modelId);
                    var cesta = new Models.Model3DModels
                    {

                        ModelPath = dbPath,
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

    }
}
