using Microsoft.AspNetCore.JsonPatch;
using Microsoft.EntityFrameworkCore;
using Model;
using Model.Entity.GenericObject;
using Repository.Interfaces;
using System.Linq.Expressions;

namespace Repository.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : IdentityObject
    {
        protected readonly Context Context;
        private readonly DbSet<T> _table;

        public GenericRepository(Context context)
        {
            Context = context;
            _table = context.Set<T>();
        }

        public virtual void Add(T obj)
        {
            AttachProperties(obj);

            _table.Add(obj);
            Save();
        }

        private void AttachProperties(T obj)
        {
            foreach (var property in obj.GetType().GetProperties()
                .Where(x => x.PropertyType.IsSubclassOf(typeof(IdentityObject)))
                .ToList())
            {
                var value = property.GetValue(obj) as IdentityObject;
                if (value == null) continue;

                var dbType = Context.Model.FindEntityType(property.PropertyType);
                if (dbType == null) continue;


                var dbObj = Context.Find(dbType.ClrType, value.Id);
                if (dbObj == null) continue;
                property.SetValue(obj, dbObj);
            }
        }

        public virtual bool Archive(int id)
        {
            return true;
        }


        public virtual bool Remove(int id)
        {
            var obj = _table.Find(id);
            if (obj == null) return false;

            _table.Remove(obj);
            Save();
            return true;
        }

        public virtual T Get(int id)
        {
            return _table.Find(id);
        }

        public virtual List<T> GetAll(Expression<Func<T, bool>> condition = null)
        {
            condition ??= x => true;

            var res = _table.Where(condition).AsQueryable();

            foreach (var property in typeof(T).GetProperties()
                .Where(x => x.PropertyType.IsSubclassOf(typeof(IdentityObject)))
                .ToList())
            {
                var dbType = Context.Model.FindEntityType(property.PropertyType);
                if (dbType == null) continue;

                res.Include(property.Name).Load();
            }

            return res.ToList();
        }

        private void Save()
        {
            Context.SaveChanges();
        }

        public virtual void Patch(T obj, JsonPatchDocument patch)
        {
            patch.ApplyTo(obj);
            Save();
        }

        public bool Exists(int id) =>
            _table.Any(e => e.Id == id);
    }
}