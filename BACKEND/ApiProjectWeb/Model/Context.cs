using Microsoft.EntityFrameworkCore;
using Model.Entity;

namespace Model
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        { 

        }
        public DbSet<Client> Client { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
