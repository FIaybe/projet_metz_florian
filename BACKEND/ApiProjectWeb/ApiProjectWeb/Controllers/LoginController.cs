using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model.Auth;
using Services.Interfaces;

namespace ApiProjectWeb.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IClientService _service;

        public LoginController(IClientService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _service.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
