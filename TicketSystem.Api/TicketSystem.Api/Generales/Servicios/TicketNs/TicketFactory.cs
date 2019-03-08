using System;
using System.Collections.Generic;
using System.Linq;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Generales.Entidades.Enums;
using TicketSystem.Api.Generales.Servicios.TicketNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.TicketNs
{
    public static class TicketFactory
    {


        public static Ticket CrearEntity(TicketVm ticket)
        {
            return new Ticket()
            {
                Tema = ticket.Tema,
                Descripcion = ticket.Descripcion,
                TicketEstadoId = (byte)TicketEstadoEnum.Pending,
                ListaEmpleado = new List<TicketEmpleado>(),
                ListaEntrada = new List<TicketEntrada>()
            };
        }

        public static TicketIndex CrearIndex(Ticket ticket)
        {
            var obj = new TicketIndex
            {
                TicketId = ticket.TicketId,
                Numero = ticket.Numero,
                Tema = ticket.Tema,
                Descripcion = ticket.Descripcion,
                FechaCreacion = ticket.FechaCreacion,
                TicketEstadoDescripcion = ticket.TicketEstado?.Descripcion,
                TicketEstadoId = ticket.TicketEstadoId,
                EmpleadoNombre = ""
            };

            if (ticket.ListaEmpleado != null & ticket.ListaEmpleado.Count > 0)
            {
                obj.EmpleadoNombre = ticket.ListaEmpleado.First().Empleado?.Nombre + " " + ticket.ListaEmpleado.First().Empleado?.Apellido;
            }

            return obj;
        }

        public static TicketInfo CrearInfo(Ticket ticket)
        {

            return new TicketInfo()
            {
                Numero = ticket.Numero,
                Tema = ticket.Tema,
                Descripcion = ticket.Descripcion,
                FechaCreacion = ticket.FechaCreacion,
                TicketEstadoId = ticket.TicketEstadoId,
                TicketEstadoDescripcion = ticket.TicketEstado?.Descripcion,

                ListaEmpleado = ticket.ListaEmpleado.Select(o => new TicketEmpleadoInfo
                {
                    EmpleadoId = o.EmpleadoId,
                    Numero = o.Empleado?.Identificador,
                    EmpleadoNombre = o.Empleado?.Nombre,
                    EmpleadoApellido = o.Empleado?.Apellido,
                    EmpleadoEmail = o.Empleado?.Email,
                }).OrderBy(o => o.EmpleadoNombre),

                ListaEntrada = ticket.ListaEntrada.Select(o => new TicketEntradaInfo
                {
                    TicketEntradaId = o.TicketEntradaId,
                    FechaInicio = o.FechaInicio,
                    FechaFinal = o.FechaFinal,
                    Nota = o.Nota,
                    EmpleadoNombre = o.Empleado?.Nombre
                }).OrderBy(o => o.FechaInicio)
            };

        }

        public static TicketVm CrearVm(Ticket ticket)
        {
            var obj = new TicketVm
            {
                TicketId = ticket.TicketId,
                Numero = ticket.Numero,
                Tema = ticket.Tema,
                Descripcion = ticket.Descripcion,
                TicketEstadoId = ticket.TicketEstadoId,

                ListaEmpleado = ticket.ListaEmpleado.Select(o => new TicketEmpleadoVm
                {
                    TicketEmpleadoId = o.TicketEmpleadoId,
                    TicketId = o.TicketId,
                    EmpleadoId = o.EmpleadoId,
                    EmpleadoNombre = String.Format("{0} {1}", o.Empleado?.Nombre, o.Empleado?.Apellido)
                }).OrderBy(o => o.TicketEmpleadoId),

                ListaEntrada = ticket.ListaEntrada.Select(o => new TicketEntradaVm
                {
                    TicketEntradaId = o.TicketEntradaId,
                    TicketId = o.TicketId,
                    EmpleadoId = o.EmpleadoId,
                    FechaInicio = o.FechaInicio,
                    FechaFinal = o.FechaFinal,
                    Nota = o.Nota,
                    EmpleadoNombre = String.Format("{0} {1}", o.Empleado?.Nombre, o.Empleado?.Apellido)
                }).OrderBy(o => o.FechaInicio)
            };

            return obj;

        }

        public static void MapearAEntity(Ticket obj, TicketVm ticket)
        {

            obj.Tema = ticket.Tema;
            obj.Descripcion = ticket.Descripcion;
            obj.TicketEstadoId = ticket.TicketEstadoId;

            MapTicketEmpleado(ticket, obj);
            MapTicketEntrada(ticket, obj);
        }

        public static TicketVm CrearNuevo(string identificador)
        {
            return new TicketVm
            {
                TicketId = 0,
                Numero = identificador,
                Tema = "",
                Descripcion = "",
                TicketEstadoId = (byte)TicketEstadoEnum.Open,
                ListaEmpleado = new List<TicketEmpleadoVm>(),
                ListaEntrada = new List<TicketEntradaVm>(),

            };
        }

        public static void MapTicketEmpleado(TicketVm origen, Ticket destino)
        {
            if (destino.ListaEmpleado == null)
                destino.ListaEmpleado = new List<TicketEmpleado>();

            int cantidad = destino.ListaEmpleado.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaEmpleado[i];

                var itemVm = origen
                    .ListaEmpleado?
                    .FirstOrDefault(o => o.TicketEmpleadoId == item.TicketEmpleadoId);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaEmpleado.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    item.TicketId = itemVm.TicketId;
                    item.EmpleadoId = itemVm.EmpleadoId;
                }
            }

            // AGREGAR
            if (origen.ListaEmpleado != null && origen.ListaEmpleado.Any())
            {
                foreach (var itemVm in origen.ListaEmpleado?.Where(o => o.TicketEmpleadoId <= 0))
                {
                    var item = new TicketEmpleado
                    {
                        TicketEmpleadoId = 0,
                        TicketId = itemVm.TicketId,
                        EmpleadoId = itemVm.EmpleadoId
                    };

                    destino.ListaEmpleado.Add(item);
                }
            }
        }

        public static void MapTicketEntrada(TicketVm origen, Ticket destino)
        {
            if (destino.ListaEntrada == null)
                destino.ListaEntrada = new List<TicketEntrada>();

            int cantidad = destino.ListaEntrada.Count();
            for (int i = 0; i < cantidad; i++)
            {
                var item = destino.ListaEntrada[i];

                var itemVm = origen
                    .ListaEntrada?
                    .FirstOrDefault(o => o.TicketEntradaId == item.TicketEntradaId);

                if (itemVm == null)
                {
                    // ELIMINAR
                    destino.ListaEntrada.Remove(item);
                    i--; cantidad--;
                }
                else
                {
                    // ACTUALIZAR
                    item.TicketId = itemVm.TicketId;
                    item.EmpleadoId = itemVm.EmpleadoId;
                    item.FechaInicio = itemVm.FechaInicio;
                    item.FechaFinal = itemVm.FechaFinal;
                    item.Nota = itemVm.Nota;
                }
            }

            // AGREGAR
            if (origen.ListaEntrada != null && origen.ListaEntrada.Any())
            {
                foreach (var itemVm in origen.ListaEntrada?.Where(o => o.TicketEntradaId <= 0))
                {
                    var item = new TicketEntrada
                    {
                        TicketEntradaId = 0,
                        TicketId = itemVm.TicketId,
                        EmpleadoId = itemVm.EmpleadoId,
                        FechaInicio = itemVm.FechaInicio,
                        FechaFinal = itemVm.FechaFinal,
                        Nota = itemVm.Nota,
                    };

                    destino.ListaEntrada.Add(item);
                }
            }
        }

    }
}
