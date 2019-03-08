using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TicketSystem.Api.Core.Infraestructura;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Servicios.UsuarioNs.Dtos;

namespace TicketSystem.Api.Generales.Servicios.UsuarioNs
{
    public class UsuarioServicio : IUsuarioServicio
    {
        private IUsuarioRepository _repository;

        public UsuarioServicio(
            IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<UsuarioVm> ObtenerUsuario(string userName, string password)
        {
            if (string.IsNullOrWhiteSpace(userName))
                throw new NullReferenceException("You must specify the username");

            if (string.IsNullOrWhiteSpace(password))
                throw new NullReferenceException("You must specify the password");

            var usuario = await _repository.ObtenerUsuario(userName, password);


            return UsuarioFactory.Crear(usuario);
        }

        public async Task<IEnumerable<UsuarioIndex>> ObtenerTodosIndexAsync()
        {
            var lista = await _repository.TodosAsync();

            if (lista == null)
                return null;

            var listaIndex = lista.Select(o => UsuarioFactory.CrearIndex(o));

            return listaIndex;
        }

        public async Task<UsuarioInfo> ObtenerInfoPorIdAsync(int usuarioId)
        {
            var obj = await _repository.ObtenerAsync(usuarioId);
            if (obj == null)
                return null;

            return UsuarioFactory.CrearInfo(obj);

        }

        public async Task<UsuarioVm> ObtenerViewModelPorIdAsync(int usuarioId)
        {
            var obj = await _repository.ObtenerAsync(usuarioId);
            if (obj == null)
                return null;

            return UsuarioFactory.CrearVm(obj);
        }

        public OperationResult Registrar(UsuarioVm usuario)
        {
            var resultado = ValidarModelo(usuario);

            if (resultado.EsValido)
            {
                if (usuario.UsuarioId == 0)
                {
                    Agregar(usuario);
                }
                else
                {
                    Actualizar(usuario);
                }
            }

            return resultado;
        }

        public UsuarioVm ObtenerNuevo()
        {
            return UsuarioFactory.CrearNuevo();
        }


        private void Agregar(UsuarioVm usuarioVm)
        {
            var obj = UsuarioFactory.CrearEntity(usuarioVm);

            _repository.Agregar(obj);
        }

        public OperationResult Activar(int usuarioId)
        {
            var obj = _repository.Obtener(usuarioId);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            if (obj.Estado == true)
            {
                resultado.Agregar("This registry is alredy active.");
                return resultado;
            }

            obj.Estado = true;
            _repository.Actualizar(obj);

            return resultado;
        }


        public OperationResult InActivar(int usuarioId)
        {
            var obj = _repository.Obtener(usuarioId);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            if (obj.Estado == false)
            {
                resultado.Agregar("This registry is alredy inactive.");
                return resultado;
            }

            obj.Estado = false;
            _repository.Actualizar(obj);

            return resultado;
        }

        public OperationResult Eliminar(int id)
        {
            var obj = _repository.Obtener(id);
            if (obj == null)
            {
                throw new InvalidOperationException("The registry doesn't exist.");
            }

            var resultado = new OperationResult();

            _repository.Eliminar(obj);
            return resultado;
        }


        private void Actualizar(UsuarioVm usuarioVm)
        {
            var obj = _repository.Obtener(usuarioVm.UsuarioId);
            if (obj == null)
            {
                throw new InvalidOperationException("El registro no existe.");
            }

            UsuarioFactory.MapearAEntity(obj, usuarioVm);

            _repository.Actualizar(obj);
        }

        private OperationResult ValidarModelo(UsuarioVm obj)
        {
            var resultado = new OperationResult();

            if (String.IsNullOrWhiteSpace(obj.UserName))
                resultado.Agregar("You must specify the user's name");

            if (String.IsNullOrWhiteSpace(obj.UserPassword))
                resultado.Agregar("You must specify the user's Password");

            return resultado;

        }
    }
}
