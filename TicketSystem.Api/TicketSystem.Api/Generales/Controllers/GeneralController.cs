using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using TicketSystem.Api.Models;

namespace TicketSystem.Api.Generales.Controllers
{
    [Route("api/general")]
    public class GeneralController : Controller
    {
        private ApplicationDbContext _dbContext;

        public GeneralController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var usuario = _dbContext.Usuario.FirstOrDefault();

                return Json("Usuario Admin " + usuario.UserName);
            }
            catch (Exception)
            {
                return StatusCode(500, "The operation wasn't complete");


            }
        }

    }
}

