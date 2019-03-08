using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Entidades;

namespace TicketSystem.Api.Generales.Abstraccion
{
    public interface ITicketEntradaRepository
    {
        Task<IEnumerable<TicketEntrada>> ObtenerPorEmpleado(int empleadoId);
        Task<IEnumerable<TicketEntrada>> ObtenerTodos();
        TicketEntrada ObtenerPorTicket(int tiketId);
    }
}
