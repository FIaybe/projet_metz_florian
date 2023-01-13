using Model.Entity;
using Services.Interfaces;
using System.Diagnostics.Metrics;
using System.Net;
using System.Reflection.Emit;
using System.Reflection;

namespace Services.Services.Seeding
{
    public class ClientSeeder : IClientSeeder
    {
        public IGenericService<Client> _service;
        public ClientSeeder(IGenericService<Client> service) {
            _service= service;
        }

        public void Seed()
        {
            var me = new Client
            {
                Id = 1,
                Email = "fmetz1@cfai-formation.fr",
                FirstName = "Florian",
                LastName = "Metz",
                Password = "24042001",
                Phone= "1234567890",
                Address = "10 Allée de la houblonnièe",
                ZipCode = "67200",
                City = "Strasbourg",
                Country = "France",
                Gender = "Homme"
            };

            var admin = new Client
            {
                Id = 2,
                Email = "admin@admin.fr",
                FirstName = "admin",
                LastName = "admin",
                Password = "admin",
                Phone = "9874653210",
                Address = "DataCenter 3XZO",
                ZipCode = "40403",
                City = "IceCity",
                Country = "Iceland",
                Gender = "Robot"
            };

            _service.Add(me);
            _service.Add(admin);
        }
    }
}
