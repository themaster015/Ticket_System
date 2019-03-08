using System;
using TicketSystem.Api.Generales.Entidades;
using TicketSystem.Api.Generales.Servicios.UsuarioNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.UsuarioNs
{
    public static class UsuarioFactory
    {
        public static UsuarioVm Crear(Usuario usuario)
        {
            if (usuario == null)
                return null;

            var obj = new UsuarioVm();

            obj.UsuarioId = usuario.UsuarioId;
            obj.UserName = usuario.UserName;
            obj.UserPassword = usuario.UserPassword;
            obj.EmpleadoNombre = String.Format("{0} {1}", usuario.Empleado?.Nombre, usuario.Empleado?.Apellido);
            obj.EsAdministrador = usuario.EsAdministrador;

            return obj;

        }

        public static Usuario CrearEntity(UsuarioVm usuario)
        {
            return new Usuario()
            {
                UserName = usuario.UserName,
                UserPassword = usuario.UserPassword,
                EsAdministrador = usuario.EsAdministrador,
                Estado = usuario.EsAdministrador

            };
        }

        public static UsuarioIndex CrearIndex(Usuario usuario)
        {
            var obj = new UsuarioIndex();

            obj.UsuarioId = usuario.UsuarioId;
            obj.UserName = usuario.UserName;
            obj.UserPassword = usuario.UserPassword;
            obj.EsAdministrador = usuario.EsAdministrador;
            obj.Estado = usuario.EsAdministrador;

            return obj;
        }

        public static UsuarioInfo CrearInfo(Usuario usuario)
        {

            return new UsuarioInfo()
            {
                UserName = usuario.UserName,
                EsAdministrador = usuario.EsAdministrador,
                Estado = usuario.EsAdministrador,
                EmpleadoNombre = String.Format("{0} {1}", usuario.Empleado?.Nombre, usuario.Empleado?.Apellido)

            };

        }

        public static UsuarioVm CrearVm(Usuario usuario)
        {
            var obj = new UsuarioVm
            {
                UsuarioId = usuario.UsuarioId,
                UserName = usuario.UserName,
                UserPassword = usuario.UserPassword,
                EmpleadoNombre = String.Format("{0} {1}", usuario.Empleado?.Nombre, usuario.Empleado?.Apellido),
                EsAdministrador = usuario.EsAdministrador,
                Estado = usuario.Estado
            };

            return obj;

        }

        public static void MapearAEntity(Usuario obj, UsuarioVm usuario)
        {
            obj.UserName = usuario.UserName;
            obj.UserPassword = usuario.UserPassword;
            obj.EsAdministrador = usuario.EsAdministrador;
            obj.Estado = usuario.Estado;
        }

        public static UsuarioVm CrearNuevo()
        {
            return new UsuarioVm
            {

                UsuarioId = 0,
                UserName = "",
                UserPassword = "",
                EmpleadoNombre = "",
                EsAdministrador = false

            };
        }
    }
}
