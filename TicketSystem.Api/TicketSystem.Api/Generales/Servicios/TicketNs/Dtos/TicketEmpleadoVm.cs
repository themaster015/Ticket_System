namespace TicketSystem.Api.Generales.Servicios.TicketNs.Dtos
{
    public class TicketEmpleadoVm
    {
        public int TicketEmpleadoId { get; set; }
        public int TicketId { get; set; }
        public int EmpleadoId { get; set; }

        public string EmpleadoNombre { get; set; }
    }
}
