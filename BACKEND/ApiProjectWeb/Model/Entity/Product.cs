using Model.Entity.GenericObject;

namespace Model.Entity
{
    public class Product : IdentityObject
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
    }
}
