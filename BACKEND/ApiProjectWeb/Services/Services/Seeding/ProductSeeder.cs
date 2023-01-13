using Model.Entity;
using Services.Interfaces;

namespace Services.Services.Seeding
{
    public class ProductSeeder : IProductSeeder
    {
        public IGenericService<Product> _service;

        public ProductSeeder(IGenericService<Product> service)
        {
            _service = service;
        }

        public void Seed()
        {
            var hochet = new Product
            {
                Id = 1,
                Name = "Hochet",
                Description = "Hochet en bois",
                Price = 5.99,
                Quantity = 0
            };

            var puzzle = new Product
            {
                Id = 2,
                Name = "Puzzle",
                Description = "Puzzle de 1500 pièces pour les 3-100 ans",
                Price = 20,
                Quantity = 0
            };

            var livre = new Product
            {
                Id = 3,
                Name = "Livre",
                Description = "Livre de 1000 pages",
                Price = 10,
                Quantity = 0
            };

            var cuillere = new Product
            {
                Id = 4,
                Name = "Cuillère",
                Description = "Cuillère idéale pour boire son café quand il est chaud",
                Price = 7.99,
                Quantity = 0
            };

            var epee = new Product
            {
                Id = 5,
                Name = "Epée",
                Description = "Epée de chevalier en acier",
                Price = 50,
                Quantity = 0
            };

            var sabre = new Product
            {
                Id = 6,
                Name = "Sabre",
                Description = "Sabre laser idéal pour les apprentis jedi",
                Price = 500,
                Quantity = 0             
            };

            var avion = new Product
            {
                Id =7,
                Name = "Avion",
                Description = "Avion réél no noob no arnaque",
                Price = 7500,
                Quantity = 0
            };

            _service.Add(hochet);
            _service.Add(puzzle);
            _service.Add(livre);
            _service.Add(cuillere);
            _service.Add(epee);
            _service.Add(sabre);
            _service.Add(avion);
        }
        
    }
}
