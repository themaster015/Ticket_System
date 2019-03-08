﻿using System;

namespace TicketSystem.Api.Generales.Servicios.TicketNs.Dtos
{
    public class TicketEntradaInfo
    {
        public int TicketEntradaId { get; set; }
        public DateTime FechaInicio { get; set; }
        public DateTime FechaFinal { get; set; }
        public string Nota { get; set; }
        public string EmpleadoNombre { get; set; }
    }
}
