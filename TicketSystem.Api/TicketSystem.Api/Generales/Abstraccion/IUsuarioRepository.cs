using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Entidades;

namespace TicketSystem.Api.Generales.Abstraccion
{
    public interface IUsuarioRepository
    {
        Task<Usuario> ObtenerUsuario(string username, string password);

        Task<Usuario> ObtenerAsync(int empleadoId);

        Usuario Obtener(int empleadoId);

        Task<IEnumerable<Usuario>> TodosAsync();

        void Agregar(Usuario empleado);

        void Actualizar(Usuario empleado);

        void Eliminar(Usuario empleado);
    }
}
