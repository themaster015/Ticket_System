using System;
using System.ComponentModel.DataAnnotations;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos
{
    public class EmpleadoVm
    {
        public int EmpleadoId { get; set; }

        public string Identificador { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "The First Name Must Be Between {2} y {1} characters.")]
        public string Nombre { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "The Last Name Must Be Between {2} y {1} characters.")]
        public string Apellido { get; set; }

        [Required]
        public string Cedula { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Sexo { get; set; }
        public DateTime FechaNacimiento { get; set; }
        public DateTime FechaCreacion { get; set; }
        public bool Estado { get; set; }
    }
}
