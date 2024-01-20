using System.Security.Claims;
using ApiEndpoints;
using ApiEndpoints.ApplicationServices;
using ApiEndpoints.DomainServices;
using ApiEndpoints.Infrastructure;
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
builder.Services.AddScoped<INoteCategoryRepository, NoteCategoryDbRepository>();


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
        var service = new NoteService(noteRepository, context);
        return await service.GetNotes();
    })
    .WithName("GetNotes")
    .WithOpenApi()
    .RequireAuthorization();

app.MapGet("/GetNotes/{guid:guid}", async (Guid guid, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new NoteService(noteRepository, context);
        return await service.GetSingleNote(guid);
    })
    .WithName("GetSingleNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapGet("/GetNotesByCategory/", async (INoteRepository noteRepository, HttpContext context) =>
        {
            var service = new NoteService(noteRepository, context);
            return await service.GetNotesByCategory(null);
        })
    .WithName("GetNotesByCategoryNull")
    .WithOpenApi()
    .RequireAuthorization();

app.MapGet("/GetNotesByCategory/{categoryGuid}",
        async (Guid categoryGuid, INoteRepository noteRepository, HttpContext context) =>
        {
            var service = new NoteService(noteRepository, context);
            return await service.GetNotesByCategory(categoryGuid);
        })
    .WithName("GetNotesByCategory")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/CreateNote", async (NoteInsert note, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new NoteService(noteRepository, context);
        return await service.CreateNote(note);
    })
    .WithName("CreateNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/UpdateNote", async (Note note, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new NoteService(noteRepository, context);
        return await service.UpdateNote(note);
    })
    .WithName("UpdateNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/DeleteNote/{guid:guid}", async (Guid guid, INoteRepository noteRepository, HttpContext context) =>
    {
        var service = new NoteService(noteRepository, context);
        return await service.DeleteNote(guid);
    })
    .WithName("DeleteNote")
    .WithOpenApi()
    .RequireAuthorization();

app.MapGet("/GetCategories", async (INoteCategoryRepository noteCategoryRepository, HttpContext context) =>
    {
        var service = new NoteCategoryService(noteCategoryRepository, context);
        return await service.GetCategories();
    })
    .WithName("GetCategories")
    .WithOpenApi()
    .RequireAuthorization();

app.MapPost("/CreateCategory",
        async (NoteCategory category, INoteCategoryRepository noteCategoryRepository, HttpContext context) =>
        {
            var service = new NoteCategoryService(noteCategoryRepository, context);
            return await service.CreateCategory(category);
        })
    .WithName("CreateCategory")
    .WithOpenApi()
    .RequireAuthorization();

app.Run();