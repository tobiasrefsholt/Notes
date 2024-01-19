using System.Security.Claims;

namespace ApiEndpoints.ApplicationServices;

public abstract class AppService
{
    protected readonly HttpContext _httpContext;
    protected readonly Guid _userGuid;

    protected AppService(HttpContext httpContext)
    {
        _httpContext = httpContext;
        _userGuid = GetUserGuid();
    }
    
    private Guid GetUserGuid()
    {
        Guid.TryParse(_httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), out var userGuid);
        return userGuid;
    }
}