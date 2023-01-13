using ApiProjectWeb.Helpers;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Model.Auth;
using Model.Entity;
using Repository.Interfaces;
using Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Services.Services;

public class ClientService : GenericService<Client>, IClientService
{
    private readonly AppSettings settings;
    public ClientService(IGenericRepository<Client> genericRepository, IOptions<AppSettings> appSettings) : base(genericRepository)
    {
        settings = appSettings.Value;
    }

    public string GetFullName(int id)
    {
        var person = GenericRepository.Get(id);
        return $"{person.FirstName} {person.LastName}";
    }


    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var client = GenericRepository.GetAll(x => x.Email == model.Email && x.Password == model.Password).FirstOrDefault();

        // return null if user not found
        if (client == null) return null;

        // authentication successful so generate jwt token
        var token = generateJwtToken(client);

        return new AuthenticateResponse(client, token);
    }

    private string generateJwtToken(Client client)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(settings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", client.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

}