using ApiProjectWeb.Helpers;
using Microsoft.AspNetCore.Mvc;
using Model.Entity.GenericObject;
using Services.Interfaces;

namespace ApiProjectWeb.Controllers.Generic
{
    [Route("api/[controller]")]
    public class GenericController<T> : Controller where T : IdentityObject
    {
        protected IGenericService<T> _genericService;

        public GenericController(IGenericService<T> genericService)
        {
            _genericService = genericService;
        }

        [HttpGet]
        public virtual IActionResult GetAll()
        {
            var objs = _genericService.GetAll();
            return Ok(objs);
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var obj = _genericService.Get(id);
            if (obj == null)
            {
                return NotFound();
            }

            return Ok(obj);
        }

        [HttpPost]
        public virtual IActionResult Post([FromBody] T obj)
        {
            _genericService.Add(obj);
            return Created($"stocked in table Employee with id {obj.Id}", obj);
        }

        [HttpPatch("{id}")]
        public IActionResult Patch(int id, T updated)
        {
            var obj = _genericService.Patch(id, updated);
            return Accepted(obj);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var res = _genericService.Remove(id);
            if (res)
            {
                return NoContent();
            }

            return NotFound();
        }
    }
}
