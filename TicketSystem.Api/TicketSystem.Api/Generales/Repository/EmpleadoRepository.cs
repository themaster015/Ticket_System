using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Models;

namespace TicketSystem.Api.Generales.Repository
{
    public class EmpleadoRepository : IEmpleadoRepository
    {
        private ApplicationDbContext _dbContext;

        public EmpleadoRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public Empleado Obtener(int empleadoId)
        {
            return _dbContext.Empleado
               .FirstOrDefault(o => o.EmpleadoId == empleadoId);
        }

        public async Task<Empleado> ObtenerAsync(int empleadoId)
        {
            return await _dbContext.Empleado.AsNoTracking()
                .FirstOrDefaultAsync(o => o.EmpleadoId == empleadoId);
        }

        public async Task<IEnumerable<Empleado>> TodosAsync()
        {
            return await _dbContext.Empleado.AsNoTracking().ToListAsync();
        }

        public string ObtenerUltimoIdentificador()
        {
            return _dbContext.Empleado.AsNoTracking().Max(o => o.Identificador);
        }

        public void Agregar(Empleado obj)
        {
            _dbContext.Empleado.Add(obj);
            _dbContext.SaveChanges();
        }

        public void Actualizar(Empleado obj)
        {
            _dbContext.Empleado.Update(obj);
            _dbContext.SaveChanges();
        }

        public void Eliminar(Empleado obj)
        {
            _dbContext.Empleado.Remove(obj);
            _dbContext.SaveChanges();
        }
    }
}
