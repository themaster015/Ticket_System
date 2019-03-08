namespace TicketSystem.Api.Generales.Entidades
{
    public class Usuario
    {
        public int UsuarioId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public int EmpleadoId { get; set; }
        public bool EsAdministrador { get; set; }
        public bool Estado { get; set; }

        public virtual Empleado Empleado { get; set; }
    }
}
