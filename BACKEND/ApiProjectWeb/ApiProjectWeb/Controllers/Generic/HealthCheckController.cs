using Microsoft.AspNetCore.Mvc;

namespace ApiProjectWeb.Controllers.Generic
{
    [Route("healthcheck")]
    [ApiController]
    public class HealthCheckController : Controller
    {
        [HttpGet]
        public IActionResult HealthCheck()
        {
            return Ok("Api fonctionne");
        }
    }
}
