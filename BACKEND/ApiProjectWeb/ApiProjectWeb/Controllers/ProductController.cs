using ApiProjectWeb.Controllers.Generic;
using ApiProjectWeb.Helpers;
using Microsoft.AspNetCore.Mvc;
using Model.Entity;
using Services.Interfaces;

namespace ApiProjectWeb.Controllers
{
    [Route("api/[controller]")]
    [AuthorizeJwt]
    public class ProductController : GenericController<Product>
    {
        public ProductController(IGenericService<Product> genericService) : base(genericService)
        {
        }

        [HttpGet("term/{term}")]
        public IActionResult FromTerm(string term)
        {
            var res = _genericService.GetAll(x => x.Name.ToLower().Contains(term.ToLower()));
            return Ok(res);
        }
    }
}
