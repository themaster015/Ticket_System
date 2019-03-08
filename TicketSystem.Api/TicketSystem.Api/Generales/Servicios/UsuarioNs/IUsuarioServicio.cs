using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Generales.Servicios.UsuarioNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.UsuarioNs
{
    public interface IUsuarioServicio
    {
        Task<UsuarioVm> ObtenerUsuario(string userName, string password);

        Task<IEnumerable<UsuarioIndex>> ObtenerTodosIndexAsync();

        Task<UsuarioInfo> ObtenerInfoPorIdAsync(int usuarioId);

        UsuarioVm ObtenerNuevo();

        Task<UsuarioVm> ObtenerViewModelPorIdAsync(int usuarioId);

        OperationResult Registrar(UsuarioVm usuarioVm);

        OperationResult Activar(int usuarioId);

        OperationResult InActivar(int usuarioId);

        OperationResult Eliminar(int usuarioId);
    }
}
