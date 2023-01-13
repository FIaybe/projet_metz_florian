using Model.Auth;

namespace Services.Interfaces
{
    public interface IClientService
    {
        string GetFullName(int id);
        AuthenticateResponse Authenticate(AuthenticateRequest model);
    }
}
