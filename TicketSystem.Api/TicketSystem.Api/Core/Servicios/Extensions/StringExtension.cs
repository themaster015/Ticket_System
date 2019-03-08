namespace TicketSystem.Api.Core.Servicios.Extensions
{
    public static class StringExtension
    {
        public static string ProximoIdentificadorConFormato(this string ultimoIdentificador, string formato)
        {
            int nuevoIdentificador = 0;

            if (int.TryParse(ultimoIdentificador, out nuevoIdentificador) == false)
            {
                nuevoIdentificador = 0;
            }

            nuevoIdentificador++;

            return nuevoIdentificador.ToString(formato);
        }
    }
}
