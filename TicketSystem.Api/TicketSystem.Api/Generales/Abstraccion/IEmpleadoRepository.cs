using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Generales.Entidades;

namespace TicketSystem.Api.Generales.Abstraccion
{
    public interface IEmpleadoRepository
    {
        Task<Empleado> ObtenerAsync(int empleadoId);

        Empleado Obtener(int empleadoId);

        Task<IEnumerable<Empleado>> TodosAsync();

        string ObtenerUltimoIdentificador();

        void Agregar(Empleado empleado);

        void Actualizar(Empleado empleado);

        void Eliminar(Empleado empleado);

    }
}
