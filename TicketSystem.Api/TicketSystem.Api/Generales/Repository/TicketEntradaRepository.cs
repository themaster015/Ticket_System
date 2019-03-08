using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Models;

namespace TicketSystem.Api.Generales.Repository
{
    public class TicketEntradaRepository : ITicketEntradaRepository
    {
        private ApplicationDbContext _dbContext;

        public TicketEntradaRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TicketEntrada>> ObtenerPorEmpleado(int empleadoId)
        {
            return await _dbContext.TicketEntrada.AsNoTracking().Where(o => o.EmpleadoId == empleadoId).ToListAsync();
        }

        public async Task<IEnumerable<TicketEntrada>> ObtenerTodos()
        {
            return await _dbContext.TicketEntrada.AsNoTracking()
                .Include(o => o.Empleado)
                .Include(o => o.Ticket)
                .ToListAsync();
        }

        public TicketEntrada ObtenerPorTicket(int ticketId)
        {
            return _dbContext.TicketEntrada.FirstOrDefault(o => o.TicketId == ticketId);
        }

    }
}
