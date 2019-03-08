using System;
using System.Collections.Generic;

namespace TicketSystem.Api.Generales.Entidades
{
    public class Ticket
    {
        public int TicketId { get; set; }
        public string Numero { get; set; }
        public string Tema { get; set; }
        public string Descripcion { get; set; }
        public DateTime FechaCreacion { get; set; }
        public int TicketEstadoId { get; set; }

        public virtual TicketEstado TicketEstado { get; set; }
        public virtual List<TicketEmpleado> ListaEmpleado { get; set; }
        public virtual List<TicketEntrada> ListaEntrada { get; set; }
    }
}
