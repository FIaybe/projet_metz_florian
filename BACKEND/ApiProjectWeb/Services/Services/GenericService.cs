using Microsoft.AspNetCore.JsonPatch;
using Model.Entity.GenericObject;
using Repository.Interfaces;
using Services.Interfaces;
using System.Linq.Expressions;

namespace Services.Services
{
    public class GenericService<T> : IGenericService<T> where T : IdentityObject
    {
        protected readonly IGenericRepository<T> GenericRepository;
        public GenericService(IGenericRepository<T> genericRepository)
        {
            GenericRepository = genericRepository;
        }
        public virtual void Add(T obj)
        {
            GenericRepository.Add(obj);
        }

        public virtual bool Remove(int id)
        {
            return GenericRepository.Remove(id);
        }

        public T Get(int id)
        {
            return GenericRepository.Get(id);
        }
        
        public List<T> GetAll(Expression<Func<T, bool>> condition)
        {
            return GenericRepository.GetAll(condition);
        }
        
        public T Patch(int id, T updated)
        {
            var obj = Get(id);
            var patch = new JsonPatchDocument();
            GenericRepository.Patch(obj, patch);
            return obj;
        }

        public bool Exists(int id)
        {
            return GenericRepository.Exists(id);
        }
    }
}
