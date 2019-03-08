using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Core.Servicios.Extensions;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Servicios.TicketNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.TicketNs
{
    public class TicketServicio : ITicketServicio
    {
        private ITicketRepository _repository;
        private ITicketEntradaRepository _ticketEntradaRepository;

        public TicketServicio(
            ITicketRepository repository,
            ITicketEntradaRepository ticketEntradaRepository
            )
        {
            _ticketEntradaRepository = ticketEntradaRepository;
            _repository = repository;
        }

        public async Task<IEnumerable<TicketIndex>> ObtenerTodosIndexAsync()
        {
            var lista = await _repository.TodosAsync();

            if (lista == null)
                return null;

            var listaIndex = lista.Select(o => TicketFactory.CrearIndex(o));

            return listaIndex;
        }

        public async Task<TicketInfo> ObtenerInfoPorIdAsync(int ticketId)
        {
            var obj = await _repository.ObtenerAsync(ticketId);
            if (obj == null)
                return null;

            return TicketFactory.CrearInfo(obj);

        }

        public async Task<TicketVm> ObtenerViewModelPorIdAsync(int ticketId)
        {
            var obj = await _repository.ObtenerAsync(ticketId);
            if (obj == null)
                return null;

            return TicketFactory.CrearVm(obj);
        }

        public OperationResult Registrar(TicketVm ticket)
        {
            var resultado = ValidarModelo(ticket);

            if (resultado.EsValido)
            {
                if (ticket.TicketId == 0)
                {
                    Agregar(ticket);
                }
                else
                {
                    Actualizar(ticket);
                }
            }

            return resultado;
        }

        public TicketVm ObtenerNuevo()
        {
            return TicketFactory.CrearNuevo(ObtenerProximoIdentificador());
        }

        private string ObtenerProximoIdentificador()
        {
            var identificador = _repository.ObtenerUltimoIdentificador();

            return identificador.ProximoIdentificadorConFormato("00000");
        }

        private void Agregar(TicketVm ticketVm)
        {
            var obj = TicketFactory.CrearEntity(ticketVm);
            obj.Numero = ObtenerProximoIdentificador();
            obj.FechaCreacion = DateTime.Now;
            TicketFactory.MapTicketEmpleado(ticketVm, obj);
            TicketFactory.MapTicketEntrada(ticketVm, obj);

            _repository.Agregar(obj);
        }


        public OperationResult Eliminar(int id)
        {
            var resultado = new OperationResult();

            var obj = _repository.Obtener(id);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var entrada = _ticketEntradaRepository.ObtenerPorTicket(id);

            if (entrada != null)
            {
                resultado.Agregar("This ticket can't be eliminated because it has entry references");
            }

            if (resultado.EsValido)
            {
                _repository.Eliminar(obj);
            }

            return resultado;
        }


        private void Actualizar(TicketVm ticketVm)
        {
            var obj = _repository.Obtener(ticketVm.TicketId);
            if (obj == null)
            {
                throw new InvalidOperationException("El registro no existe.");
            }

            TicketFactory.MapearAEntity(obj, ticketVm);

            _repository.Actualizar(obj);
        }

        private OperationResult ValidarModelo(TicketVm obj)
        {
            var resultado = new OperationResult();

            if (String.IsNullOrWhiteSpace(obj.Tema))
                resultado.Agregar("You must specify the ticket's subject");

            if (String.IsNullOrWhiteSpace(obj.Descripcion))
                resultado.Agregar("You must specify the ticket's Description");

            if (obj.ListaEmpleado == null || obj.ListaEmpleado.Count() <= 0)
                resultado.Agregar("You must specify at least one employee for the ticket");

            foreach (var item in obj.ListaEntrada)
            {

                if (item.Nota == "")
                    resultado.Agregar("You must specify the nota for the entry ");

                if (item.EmpleadoId <= 0)
                    resultado.Agregar("You must specify the employee for the entry " + item.Nota);

            }

            return resultado;


        }

        public async Task<IEnumerable<TicketVm>> ObtenerPorEmpleado(int empleadoId)
        {
            if (empleadoId <= 0)
            {
                throw new InvalidOperationException("Error in the parameter employeeId");
            }

            var tickets = await _repository.ObtenerPorEmpleado(empleadoId);
            if (tickets == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var lista = tickets.Select(o => TicketFactory.CrearVm(o));

            return lista;
        }
    }
}
