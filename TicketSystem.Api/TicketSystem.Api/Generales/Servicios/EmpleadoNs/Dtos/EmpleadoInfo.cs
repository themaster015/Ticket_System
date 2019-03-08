using System;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos
{
    public class EmpleadoInfo
    {
        public string Identificador { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Cedula { get; set; }
        public string Email { get; set; }
        public string Sexo { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }
    }
}
