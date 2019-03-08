using System;
using System.Collections.Generic;
using System.Linq;

namespace TicketSystem.Api.Core.Infraestructura
{
    public class OperationResult
    {
        public bool EsValido
        {
            get
            {
                if (Lista == null)
                {
                    return true;
                }

                return Lista.Count() == 0;
            }
        }

        public List<string> Lista { get; private set; }

        public OperationResult()
        {
            Lista = new List<string>();
        }


        public OperationResult Agregar(OperationResult resultado)
        {
            if (resultado != null)
            {
                Lista.AddRange(resultado.Lista);
            }

            return this;
        }

        public OperationResult Agregar(string mensaje)
        {
            if (!String.IsNullOrWhiteSpace(mensaje))
            {
                Lista.Add(mensaje);
            }

            return this;
        }

        public OperationResult Agregar(List<string> validaciones)
        {
            if (validaciones != null && validaciones.Count > 0)
            {
                Lista.AddRange(validaciones);
            }

            return this;
        }


    }
}
