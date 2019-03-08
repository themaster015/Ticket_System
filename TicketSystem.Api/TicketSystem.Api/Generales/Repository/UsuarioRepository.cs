using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Models;


namespace TicketSystem.Api.Generales.Repository
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private ApplicationDbContext _dbContext;

        public UsuarioRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Usuario> ObtenerUsuario(string username, string password)
        {
            var usuario = await
                _dbContext.Usuario
                .AsNoTracking()
                .Include(o => o.Empleado)
                .FirstOrDefaultAsync(o => o.UserName == username && o.UserPassword == password);

            if (usuario == null)
                return null;

            return usuario;
        }

        public Usuario Obtener(int usuarioId)
        {
            return _dbContext.Usuario
               .FirstOrDefault(o => o.UsuarioId == usuarioId);
        }

        public async Task<Usuario> ObtenerAsync(int usuarioId)
        {
            return await _dbContext.Usuario.AsNoTracking()
                .FirstOrDefaultAsync(o => o.UsuarioId == usuarioId);
        }

        public async Task<IEnumerable<Usuario>> TodosAsync()
        {
            return await _dbContext.Usuario.AsNoTracking().ToListAsync();
        }


        public void Agregar(Usuario obj)
        {
            _dbContext.Usuario.Add(obj);
            _dbContext.SaveChanges();
        }

        public void Actualizar(Usuario obj)
        {
            _dbContext.Usuario.Update(obj);
            _dbContext.SaveChanges();
        }

        public void Eliminar(Usuario obj)
        {
            _dbContext.Usuario.Remove(obj);
            _dbContext.SaveChanges();
        }
    }
}
