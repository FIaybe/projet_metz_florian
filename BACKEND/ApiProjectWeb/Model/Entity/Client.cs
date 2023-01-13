using Model.Entity.GenericObject;
using System.Text.Json.Serialization;

namespace Model.Entity
{
    public class Client : IdentityObject
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string Password { get; set; }
    }
}
