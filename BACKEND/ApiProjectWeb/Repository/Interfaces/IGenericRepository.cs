using Microsoft.AspNetCore.JsonPatch;
using System.Linq.Expressions;

namespace Repository.Interfaces
{
    public interface IGenericRepository<T>
    {
        void Add(T obj);
        bool Remove(int id);
        T Get(int id);
        List<T> GetAll(Expression<Func<T, bool>> condition);
        void Patch(T obj, JsonPatchDocument patch);
        bool Exists(int id);
        bool Archive(int id);
    }
}