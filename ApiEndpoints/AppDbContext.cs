using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ApiEndpoints;

// Create the AppDbContext class that inherits from IdentityDbContext.
internal class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        // Constructor for initializing the database context.
    }
}