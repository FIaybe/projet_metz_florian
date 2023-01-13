using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Services.Interfaces
{
    public interface IGenericService<T>
    {
        void Add(T obj);
        bool Remove(int id);
        T Get(int id);
        List<T> GetAll(Expression<Func<T, bool>> condition = null);
        public T Patch(int id, T updated);
        bool Exists(int id);
    }
}