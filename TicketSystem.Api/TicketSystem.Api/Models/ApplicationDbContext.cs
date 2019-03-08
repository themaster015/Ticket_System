using Microsoft.EntityFrameworkCore;
using TicketSystem.Api.Generales.Entidades;

namespace TicketSystem.Api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Empleado> Empleado { get; set; }
        public DbSet<Ticket> Ticket { get; set; }
        public DbSet<TicketEstado> TicketEstado { get; set; }
        public DbSet<TicketEmpleado> TicketEmpleado { get; set; }
        public DbSet<TicketEntrada> TicketEntrada { get; set; }
        public DbSet<Usuario> Usuario { get; set; }
    }
}
