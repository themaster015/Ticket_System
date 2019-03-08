using System;

namespace TicketSystem.Api.Generales.Servicios.TicketNs.Dtos
{
    public class TicketIndex
    {
        public int TicketId { get; set; }
        public int TicketEstadoId { get; set; }
        public string Numero { get; set; }
        public string Tema { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string TicketEstadoDescripcion { get; set; }
        public string EmpleadoNombre { get; set; }
    }
}
