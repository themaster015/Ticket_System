using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using TicketSystem.Api.Generales.Abstraccion;
using TicketSystem.Api.Generales.Repository;
using TicketSystem.Api.Generales.Servicios.EmpleadoNs;
using TicketSystem.Api.Generales.Servicios.TicketNs;
using TicketSystem.Api.Generales.Servicios.UsuarioNs;
using TicketSystem.Api.Models;

namespace TicketSystem.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            string conexion = Configuration.GetConnectionString("DefaultConnection");

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.UseSqlServer(conexion,
                    opcion => opcion.UseRowNumberForPaging());
            });

            services
                .AddMvcCore()
                .AddAuthorization()
                .AddJsonFormatters()
                .AddJsonOptions(o =>
                {

                    o.SerializerSettings.Converters.Add(
                        new IsoDateTimeConverter
                        {
                            DateTimeStyles = System.Globalization.DateTimeStyles.AdjustToUniversal
                        });

                    o.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Local;
                });


            var jsClient = "http://localhost:5020";

            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy.WithOrigins(jsClient)
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            services.AddScoped<IUsuarioServicio, UsuarioServicio>();
            services.AddScoped<IUsuarioRepository, UsuarioRepository>();

            services.AddScoped<IEmpleadoServicio, EmpleadoServicio>();
            services.AddScoped<IEmpleadoRepository, EmpleadoRepository>();

            services.AddScoped<ITicketServicio, TicketServicio>();
            services.AddScoped<ITicketRepository, TicketRepository>();

            services.AddScoped<ITicketEntradaRepository, TicketEntradaRepository>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("default");

            app.UseAuthentication();

            app.UseMvc();
        }
    }
}
