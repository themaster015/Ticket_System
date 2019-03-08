using System;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos
{
    public class EmpleadoReporteVm
    {
        public int EmpleadoId { get; set; }
        public int TicketId { get; set; }
        public string TicketNumero { get; set; }
        public string EmpleadoNombre { get; set; }
        public string TicketEntradaNota { get; set; }
        public DateTime TicketEntradaFechaInicio { get; set; }
        public DateTime TicketEntradaFechaFinal { get; set; }
        public string CantidadHorasEnPunto { get; set; }
    }
}

