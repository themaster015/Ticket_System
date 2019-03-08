using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Generales.Servicios.TicketNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.TicketNs
{
    public interface ITicketServicio
    {
        Task<IEnumerable<TicketIndex>> ObtenerTodosIndexAsync();

        Task<IEnumerable<TicketVm>> ObtenerPorEmpleado(int empleadoId);

        Task<TicketInfo> ObtenerInfoPorIdAsync(int ticketId);

        TicketVm ObtenerNuevo();

        Task<TicketVm> ObtenerViewModelPorIdAsync(int ticketId);

        OperationResult Registrar(TicketVm ticketVm);

        OperationResult Eliminar(int ticketId);
    }
}
