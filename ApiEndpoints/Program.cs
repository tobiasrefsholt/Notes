using ApiEndpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(dbContextOptions => dbContextOptions
    .UseMySql(builder.Configuration.GetConnectionString("MariaDB"),
        new MariaDbServerVersion(new Version(11, 2, 2)))
    .LogTo(Console.WriteLine, LogLevel.Information)
    .EnableSensitiveDataLogging()
    .EnableDetailedErrors()
);
builder.Services.AddAuthorizationBuilder();
builder.Services
    .AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<AppDbContext>();


var app = builder.Build();
app.MapIdentityApi<AppUser>();
app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/hello", () => "Hello World!")
    .WithName("Hello")
    .WithOpenApi()
    .RequireAuthorization();

app.Run();