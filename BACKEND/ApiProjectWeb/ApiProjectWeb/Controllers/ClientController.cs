using ApiProjectWeb.Controllers.Generic;
using ApiProjectWeb.Helpers;
using Microsoft.AspNetCore.Mvc;
using Model.Entity;
using Services.Interfaces;

namespace ApiProjectWeb.Controllers
{
    [Route("api/[controller]")]
    [AuthorizeJwt]
    public class ClientController : GenericController<Client>
    {
        private readonly IClientService _employeeService;
        public ClientController(IGenericService<Client> genericService, IClientService employeeService) : base(genericService)
        {
            _employeeService = employeeService;
        }
        
        [HttpGet("fullname/{id}")]
        public IActionResult FullName(int id)
        {
            var fullname = _employeeService.GetFullName(id);
            return Ok(fullname);
        }

        [HttpGet("term/{term}")]
        public IActionResult FromTerm(string term)
        {
            var res = _genericService.GetAll(x => x.FirstName.ToLower().Contains(term.ToLower()) || x.LastName.ToLower().Contains(term.ToLower()));
            return Ok(res);
        }
    }
}
