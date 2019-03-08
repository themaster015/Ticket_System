using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Entidades;

namespace TicketSystem.Api.Generales.Abstraccion
{
    public interface ITicketRepository
    {
        Task<Ticket> ObtenerAsync(int TicketId);

        Ticket Obtener(int TicketId);

        Task<IEnumerable<Ticket>> ObtenerPorEmpleado(int empleadoId);

        Task<IEnumerable<Ticket>> TodosAsync();

        string ObtenerUltimoIdentificador();

        void Agregar(Ticket Ticket);

        void Actualizar(Ticket Ticket);

        void Eliminar(Ticket Ticket);
    }
}
