using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Core.Servicios.Extensions;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos;
using TicketSystem.Api.Generales.Servicios.TicketNs;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs
{
    public class EmpleadoServicio : IEmpleadoServicio
    {
        private IEmpleadoRepository _repository;
        private ITicketServicio _ticketServicio;
        private ITicketEntradaRepository _ticketEntradaRepository;

        public EmpleadoServicio(
            IEmpleadoRepository repository,
            ITicketServicio ticketServicio,
            ITicketEntradaRepository ticketEntradaRepository)
        {
            _ticketEntradaRepository = ticketEntradaRepository;
            _ticketServicio = ticketServicio;
            _repository = repository;
        }

        public async Task<IEnumerable<EmpleadoIndex>> ObtenerTodosIndexAsync()
        {
            var lista = await _repository.TodosAsync();

            if (lista == null)
                return null;

            var listaIndex = lista.Select(o => EmpleadoFactory.CrearIndex(o));

            return listaIndex;
        }

        public async Task<EmpleadoInfo> ObtenerInfoPorIdAsync(int empleadoId)
        {
            var obj = await _repository.ObtenerAsync(empleadoId);
            if (obj == null)
                return null;

            return EmpleadoFactory.CrearInfo(obj);

        }

        public async Task<EmpleadoVm> ObtenerViewModelPorIdAsync(int empleadoId)
        {
            var obj = await _repository.ObtenerAsync(empleadoId);
            if (obj == null)
                return null;

            return EmpleadoFactory.CrearVm(obj);
        }

        public OperationResult Registrar(EmpleadoVm empleado)
        {
            var resultado = ValidarModelo(empleado);

            if (resultado.EsValido)
            {
                if (empleado.EmpleadoId == 0)
                {
                    Agregar(empleado);
                }
                else
                {
                    Actualizar(empleado);
                }
            }

            return resultado;
        }

        public EmpleadoVm ObtenerNuevo()
        {
            return EmpleadoFactory.CrearNuevo(ObtenerProximoIdentificador());
        }

        private string ObtenerProximoIdentificador()
        {
            var identificador = _repository.ObtenerUltimoIdentificador();

            return identificador.ProximoIdentificadorConFormato("00000");
        }

        private void Agregar(EmpleadoVm empleadoVm)
        {
            var obj = EmpleadoFactory.CrearEntity(empleadoVm);
            obj.Identificador = ObtenerProximoIdentificador();
            obj.FechaCreacion = DateTime.Now;

            _repository.Agregar(obj);
        }

        public OperationResult Activar(int empleadoId)
        {
            var obj = _repository.Obtener(empleadoId);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            if (obj.Estado == true)
            {
                resultado.Agregar("This registry is alredy active.");
                return resultado;
            }

            obj.Estado = true;
            _repository.Actualizar(obj);

            return resultado;
        }


        public OperationResult InActivar(int empleadoId)
        {
            var obj = _repository.Obtener(empleadoId);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            if (obj.Estado == false)
            {
                resultado.Agregar("This registry is alredy inactive.");
                return resultado;
            }

            obj.Estado = false;
            _repository.Actualizar(obj);

            return resultado;
        }

        public OperationResult Eliminar(int id)
        {
            var obj = _repository.Obtener(id);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            _repository.Eliminar(obj);
            return resultado;
        }


        private void Actualizar(EmpleadoVm empleadoVm)
        {
            var obj = _repository.Obtener(empleadoVm.EmpleadoId);
            if (obj == null)
            {
                throw new InvalidOperationException("El registro no existe.");
            }

            EmpleadoFactory.MapearAEntity(obj, empleadoVm);

            _repository.Actualizar(obj);
        }

        private OperationResult ValidarModelo(EmpleadoVm obj)
        {
            var resultado = new OperationResult();

            if (String.IsNullOrWhiteSpace(obj.Nombre))
                resultado.Agregar("You must specify the employee's name");

            if (String.IsNullOrWhiteSpace(obj.Apellido))
                resultado.Agregar("You must specify the employee's Last Name");

            if (String.IsNullOrWhiteSpace(obj.Cedula))
                resultado.Agregar("You must specify the employee's Id");

            if (String.IsNullOrWhiteSpace(obj.Email))
                resultado.Agregar("You must specify the employee's email");

            if (String.IsNullOrWhiteSpace(obj.Sexo))
                resultado.Agregar("You must specify the employee's gender");

            return resultado;

        }

        public async Task<IEnumerable<EmpleadoReporteVm>> OptenerReporte(DateTime filtroFechaInicio, DateTime filtroFechaFinal, int filtroEmpleadoId)
        {

            var empleados = await _ticketEntradaRepository.ObtenerTodos();
            if (empleados == null)
            {
                throw new InvalidOperationException("The data doesn't exist.");
            }

            var listaEntrada = new List<EmpleadoReporteVm>();

            if (filtroEmpleadoId > 0)
            {
                empleados = empleados.Where(o => o.EmpleadoId == filtroEmpleadoId);
            }

            if (filtroFechaInicio != null)
            {
                empleados = empleados.Where(o => o.FechaInicio >= filtroFechaInicio);
            }

            if (filtroFechaFinal != null)
            {
                empleados = empleados.Where(o => o.FechaFinal <= filtroFechaFinal);
            }

            foreach (var item in empleados)
            {

                var obj = new EmpleadoReporteVm
                {
                    EmpleadoId = item.EmpleadoId,
                    EmpleadoNombre = String.Format("{0} {1}", item.Empleado?.Nombre, item.Empleado?.Apellido),
                    TicketId = item.TicketId,
                    TicketNumero = item.Ticket?.Numero,
                    TicketEntradaNota = item.Nota,
                    TicketEntradaFechaInicio = item.FechaInicio,
                    TicketEntradaFechaFinal = item.FechaFinal,
                    CantidadHorasEnPunto = ObtenerDiferenciaEnHoras(item.FechaInicio, item.FechaFinal)
                };

                listaEntrada.Add(obj);
            }

            return listaEntrada.OrderBy(o => o.EmpleadoId).ThenBy(o => o.TicketId);
        }

        private string ObtenerDiferenciaEnHoras(DateTime fechaInicio, DateTime fechaFinal)
        {
            DateTime fecha1 = Convert.ToDateTime(fechaInicio);
            DateTime fecha2 = Convert.ToDateTime(fechaFinal);
            TimeSpan result = fecha2.Subtract(fecha1);
            return Convert.ToString(result.TotalHours);
        }
    }


}
