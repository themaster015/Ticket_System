using System;

namespace TicketSystem.Api.Generales.Entidades
{
    public class TicketEntrada
    {
        public int TicketEntradaId { get; set; }
        public int TicketId { get; set; }
        public int EmpleadoId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public string Nota { get; set; }

        public virtual Ticket Ticket { get; set; }
        public virtual Empleado Empleado { get; set; }



    }
}
