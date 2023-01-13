using Model.Entity;

namespace Model.Auth
{
    public class AuthenticateResponse
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public AuthenticateResponse(Client client, string token) {
            Id = client.Id;
            FirstName = client.FirstName;
            LastName = client.LastName;
            Token = token;
        }


        
    }
}
