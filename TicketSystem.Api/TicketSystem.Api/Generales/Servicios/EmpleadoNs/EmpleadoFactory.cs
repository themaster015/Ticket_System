using System;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Generales.Servicios.EmpleadoNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.EmpleadoNs
{
    public static class EmpleadoFactory
    {

        public static Empleado CrearEntity(EmpleadoVm empleado)
        {
            return new Empleado()
            {
                Identificador = empleado.Identificador,
                Nombre = empleado.Nombre,
                Apellido = empleado.Apellido,
                Cedula = empleado.Cedula,
                Email = empleado.Email,
                Sexo = empleado.Sexo,
                FechaNacimiento = empleado.FechaNacimiento,
                Estado = true,

            };
        }

        public static EmpleadoIndex CrearIndex(Empleado empleado)
        {
            var obj = new EmpleadoIndex();

            obj.EmpleadoId = empleado.EmpleadoId;
            obj.Identificador = empleado.Identificador;
            obj.Nombre = empleado.Nombre;
            obj.Apellido = empleado.Apellido;
            obj.Cedula = empleado.Cedula;
            obj.Sexo = empleado.Sexo;
            obj.Email = empleado.Email;
            obj.FechaCreacion = empleado.FechaCreacion;
            obj.Estado = empleado.Estado;
            obj.NombreCompleto = String.Format("{0} {1}", empleado.Nombre, empleado.Apellido);

            return obj;
        }

        public static EmpleadoInfo CrearInfo(Empleado empleado)
        {

            return new EmpleadoInfo()
            {
                Identificador = empleado.Identificador,
                Nombre = empleado.Nombre,
                Apellido = empleado.Apellido,
                Cedula = empleado.Cedula,
                Email = empleado.Email,
                Sexo = empleado.Sexo,
                FechaNacimiento = empleado.FechaNacimiento,
                Estado = true,

            };

        }

        public static EmpleadoVm CrearVm(Empleado empleado)
        {
            var obj = new EmpleadoVm
            {
                EmpleadoId = empleado.EmpleadoId,
                Identificador = empleado.Identificador,
                Nombre = empleado.Nombre,
                Apellido = empleado.Apellido,
                Cedula = empleado.Cedula,
                Email = empleado.Email,
                Sexo = empleado.Sexo,
                FechaNacimiento = empleado.FechaNacimiento,
                FechaCreacion = empleado.FechaCreacion,
                Estado = empleado.Estado,
            };

            return obj;

        }

        public static void MapearAEntity(Empleado obj, EmpleadoVm empleado)
        {
            obj.Nombre = empleado.Nombre;
            obj.Apellido = empleado.Apellido;
            obj.Cedula = empleado.Cedula;
            obj.Sexo = empleado.Sexo;
            obj.Email = empleado.Email;
            obj.FechaNacimiento = empleado.FechaNacimiento;
        }

        public static EmpleadoVm CrearNuevo(string identificador)
        {
            return new EmpleadoVm
            {
                EmpleadoId = 0,
                Identificador = identificador,
                Nombre = "",
                Apellido = "",
                Cedula = "",
                Email = "",
                Sexo = "M",
                FechaNacimiento = DateTime.Now,
                FechaCreacion = DateTime.Now,
                Estado = true,

            };
        }
    }
}
