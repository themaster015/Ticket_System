using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TicketSystem.Api.Generales.Servicios.TicketNs.Dtos
{
    public class TicketVm
    {
        public int TicketId { get; set; }
        [Required]
        public string Numero { get; set; }

        [Required]
        public string Tema { get; set; }

        [Required]
        public string Descripcion { get; set; }

        [Required]
        public int TicketEstadoId { get; set; }

        public IEnumerable<TicketEmpleadoVm> ListaEmpleado { get; set; }
        public IEnumerable<TicketEntradaVm> ListaEntrada { get; set; }
    }
}
