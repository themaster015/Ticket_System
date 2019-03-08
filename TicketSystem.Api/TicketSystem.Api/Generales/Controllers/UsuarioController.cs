using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Servicios.UsuarioNs;
using TicketSystem.Api.Generales.Servicios.UsuarioNs.Dtos;

namespace TicketSystem.Api.Generales.Controllers
{
    [Route("api/usuario")]
    public class UsuarioController : Controller
    {
        private IUsuarioServicio _servicio;

        public UsuarioController(
            IUsuarioServicio servicio)
        {
            _servicio = servicio;
        }

        [HttpGet]
        [Route("IniciarSesion")]
        public async Task<IActionResult> IniciarSesion(string userName, string password)
        {
            try
            {
                var resultado = await _servicio.ObtenerUsuario(userName, password);
                if (resultado != null)
                {
                    return Json(resultado);
                }
                else
                {
                    return BadRequest("User or Password are invalid");
                }

            }
            catch (Exception)
            {
                return BadRequest("User or Password are invalid.");
            }

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var lista = await _servicio.ObtenerTodosIndexAsync();

                return Json(lista);
            }
            catch (Exception)
            {
                return StatusCode(500, "The operation wasn't complete");
            }
        }

        [HttpGet]
        [Route("nuevo")]
        public async Task<IActionResult> GetNuevo()
        {
            try
            {
                var entidad = _servicio.ObtenerNuevo();

                if (entidad == null)
                    return NotFound();

                return await Task.FromResult<IActionResult>(Ok(Json(entidad)));
            }
            catch (Exception)
            {
                return BadRequest("The operation wasn't complete");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            if (id <= 0)
                return BadRequest("You must specify the id.");

            try
            {
                var entidad = await _servicio.ObtenerViewModelPorIdAsync(id);

                if (entidad == null)
                    return NotFound();

                return Ok(Json(entidad));
            }
            catch (Exception)
            {
                return BadRequest("The operation wasn't complete");
            }
        }

        [HttpGet]
        [Route("{id}/Info")]
        public async Task<IActionResult> GetInfo(int id)
        {
            if (id <= 0)
                return BadRequest("You must specify the id.");

            try
            {

                var entidad = await _servicio.ObtenerInfoPorIdAsync(id);

                if (entidad == null)
                    return NotFound();

                return Ok(Json(entidad));
            }
            catch (Exception)
            {
                return BadRequest("The operation wasn't complete");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] UsuarioVm viewModel)
        {
            if (ModelState.IsValid == false)
                return BadRequest("The information is invalid");

            try
            {
                var resultado = _servicio.Registrar(viewModel);
                if (resultado.EsValido)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("The register can't complete");
                }
            }
            catch (Exception)
            {
                return BadRequest("The register can't complete");
            }
        }

        [HttpPost]
        [Route("Activar/{id}")]
        public IActionResult Activar(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You must specify the Id.");
            }

            try
            {

                var resultado = _servicio.Activar(id);
                if (resultado.EsValido)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(resultado.Lista.FirstOrDefault());
                }
            }
            catch (Exception)
            {
                return BadRequest("No se pudo registrar.");
            }
        }


        [HttpPost]
        [Route("Inactivar/{id}")]
        public IActionResult Inactivar(int id)
        {
            if (id <= 0)
            {
                return BadRequest("You must specify the Id.");
            }

            try
            {
                var resultado = _servicio.InActivar(id);
                if (resultado.EsValido)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest(resultado.Lista.FirstOrDefault());
                }
            }
            catch (Exception)
            {
                return BadRequest("No se pudo registrar.");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("You must specify the Id.");
            try
            {

                var resultado = _servicio.Eliminar(id);
                if (resultado.EsValido)
                {
                    return Ok();
                }

                return BadRequest(resultado.Lista.FirstOrDefault());
            }
            catch (Exception)
            {
                return BadRequest("No se pudo registrar.");
            }
        }
    }
}