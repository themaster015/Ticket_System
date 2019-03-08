namespace TicketSystem.Api.Generales.Entidades
{
    public class TicketEmpleado
    {
        public int TicketEmpleadoId { get; set; }
        public int TicketId { get; set; }
        public int EmpleadoId { get; set; }

        public virtual Empleado Empleado { get; set; }
        public virtual Ticket Ticket { get; set; }

    }
}
