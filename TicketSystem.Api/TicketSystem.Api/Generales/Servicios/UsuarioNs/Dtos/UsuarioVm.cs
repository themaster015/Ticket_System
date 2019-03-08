namespace TicketSystem.Api.Generales.Servicios.UsuarioNs.Dtos
{
    public class UsuarioVm
    {
        public int UsuarioId { get; set; }
        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string EmpleadoNombre { get; set; }
        public bool EsAdministrador { get; set; }
        public bool Estado { get; set; }
    }
}
