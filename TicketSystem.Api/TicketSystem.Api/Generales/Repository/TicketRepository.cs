using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Models;

namespace TicketSystem.Api.Generales.Repository
{
    public class TicketRepository : ITicketRepository
    {
        private ApplicationDbContext _dbContext;

        public TicketRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Ticket Obtener(int ticketId)
        {
            return _dbContext.Ticket
                .Include(o => o.ListaEmpleado)
                .Include(o => o.ListaEntrada)
               .FirstOrDefault(o => o.TicketId == ticketId);
        }

        public async Task<IEnumerable<Ticket>> ObtenerPorEmpleado(int empleadoId)
        {

            return await _dbContext.Ticket.AsNoTracking()
               .Include(o => o.ListaEmpleado)
                  .ThenInclude(x => x.Empleado)
               .Include(o => o.ListaEntrada)
                  .ThenInclude(x => x.Empleado).Where(o => o.ListaEmpleado.Any(x => x.EmpleadoId == empleadoId)).ToListAsync();
        }

        public async Task<Ticket> ObtenerAsync(int ticketId)
        {
            return await _dbContext.Ticket.AsNoTracking()
                .Include(o => o.ListaEmpleado)
                   .ThenInclude(x => x.Empleado)
                .Include(o => o.ListaEntrada)
                   .ThenInclude(x => x.Empleado)
                .FirstOrDefaultAsync(o => o.TicketId == ticketId);
        }

        public async Task<IEnumerable<Ticket>> TodosAsync()
        {
            return await _dbContext.Ticket.AsNoTracking()
                .Include(o => o.ListaEmpleado)
                   .ThenInclude(x => x.Empleado)
                .ToListAsync();
        }

        public string ObtenerUltimoIdentificador()
        {
            return _dbContext.Ticket.AsNoTracking().Max(o => o.Numero);
        }

        public void Agregar(Ticket obj)
        {
            _dbContext.Ticket.Add(obj);
            _dbContext.SaveChanges();
        }

        public void Actualizar(Ticket obj)
        {
            _dbContext.Ticket.Update(obj);
            _dbContext.SaveChanges();
        }

        public void Eliminar(Ticket obj)
        {
            foreach (var item in obj.ListaEmpleado)
            {
                _dbContext.TicketEmpleado.Remove(item);
            }

            _dbContext.Ticket.Remove(obj);
            _dbContext.SaveChanges();
        }


    }
}
