using Microsoft.EntityFrameworkCore;
using Model;
using Repository.Interfaces;
using Repository.Repository;
using Services.Interfaces;
using Services.Services;
using Services.Services.Seeding;

namespace PumaBackend.DependencyInjector
{
    public class DependencyInjector
    {
        public void InjectAll(IServiceCollection services, IConfiguration configuration)
        {
            InjectServices(services);
            InjectRepositories(services);
            InjectSeeders(services);
        }

        public void InjectRepositories(IServiceCollection services)
        {
            services.AddScoped<DbContext, Context>();
            services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
        }

        public void InjectServices(IServiceCollection services)
        {
            services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));
            services.AddScoped<IClientService, ClientService>();
        }

        public void InjectSeeders(IServiceCollection services)
        {
            services.AddScoped<IClientSeeder, ClientSeeder>();
            services.AddScoped<IProductSeeder, ProductSeeder>();
        }
    }
}
