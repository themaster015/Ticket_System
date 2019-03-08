using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs
{
    public interface IEmpleadoServicio
    {

        Task<IEnumerable<EmpleadoIndex>> ObtenerTodosIndexAsync();

        Task<EmpleadoInfo> ObtenerInfoPorIdAsync(int empleadoId);

        EmpleadoVm ObtenerNuevo();

        Task<EmpleadoVm> ObtenerViewModelPorIdAsync(int empleadoId);

        OperationResult Registrar(EmpleadoVm empleadoVm);

        OperationResult Activar(int empleadoId);

        OperationResult InActivar(int empleadoId);

        OperationResult Eliminar(int empleadoId);

        Task<IEnumerable<EmpleadoReporteVm>> OptenerReporte(
            DateTime filtroFechaInicio,
            DateTime filtroFechaFinal,
            int filtroEmpleadoId);
    }
}
