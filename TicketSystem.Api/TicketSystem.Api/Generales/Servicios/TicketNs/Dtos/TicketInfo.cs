using System;
using System.Collections.Generic;

namespace TicketSystem.Api.Generales.Servicios.TicketNs.Dtos
{
    public class TicketInfo
    {
        public string Numero { get; set; }
        public string Tema { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int TicketEstadoId { get; set; }
        public string TicketEstadoDescripcion { get; set; }

        public IEnumerable<TicketEmpleadoInfo> ListaEmpleado { get; set; }
        public IEnumerable<TicketEntradaInfo> ListaEntrada { get; set; }
    }
}
