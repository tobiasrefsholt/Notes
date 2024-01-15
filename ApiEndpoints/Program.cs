using System.Security.Claims;
using ApiEndpoints;
using ApiEndpoints.ApplicationServices;
using ApiEndpoints.DomainServices;
using ApiEndpoints.Infrastructur;
using ApiEndpoints.ViewModel;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy => { policy.WithOrigins("http://localhost:5173"); });
});

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("MariaDB");
builder.Services.AddDbContext<AppDbContext>(dbContextOptions =>
{
    dbContextOptions
        .UseMySql(connectionString,
            new MariaDbServerVersion(new Version(11, 2, 2)))
        .LogTo(Console.WriteLine, LogLevel.Information)
        .EnableSensitiveDataLogging()
        .EnableDetailedErrors();
});
builder.Services.AddAuthorizationBuilder();
builder.Services
    .AddIdentityApiEndpoints<AppUser>()
    .AddEntityFrameworkStores<AppDbContext>();
var connectionFactory = new SqlConnectionFactory(connectionString);
builder.Services.AddSingleton<SqlConnectionFactory>(connectionFactory);
builder.Services.AddScoped<INoteRepository, NoteDbRepository>();


var app = builder.Build();
app.UseCors();
app.MapIdentityApi<AppUser>();
/*app.UseHttpsRedirection();*/
app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/GetNotes", async (INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new AppService(noteRepository, context);
        return await service.GetNotes();
    })
    .WithName("GetNotes")
    .WithOpenApi()
    .RequireAuthorization();

app.MapGet("/GetNotes/{guid:guid}", async (Guid guid, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new AppService(noteRepository, context);
        return await service.GetSingleNote(guid);
    })
    .WithName("GetSingleNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/CreateNote", async (Note note, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new AppService(noteRepository, context);
        return await service.CreateNote(note);
    })
    .WithName("CreateNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/UpdateNote", async (Note note, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new AppService(noteRepository, context);
        return await service.UpdateNote(note);
    })
    .WithName("UpdateNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/DeleteNote/{guid:guid}", async (Guid guid, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new AppService(noteRepository, context);
        return await service.DeleteNote(guid);
    })
    .WithName("DeleteNote")
    .WithOpenApi()
    .RequireAuthorization();

app.Run();