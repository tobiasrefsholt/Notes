using System.Security.Claims;
using ApiEndpoints.ViewModel;
using ApiEndpoints.DomainServices;
using Newtonsoft.Json;

namespace ApiEndpoints.ApplicationServices;

public class AppService
{
    private readonly INoteRepository _noteRepository;
    private readonly HttpContext _httpContext;
    private readonly Guid _userGuid;

    public AppService(INoteRepository noteRepository, HttpContext httpContext)
    {
        _noteRepository = noteRepository;
        _httpContext = httpContext;
        _userGuid = GetUserGuid();
    }

    public async Task<List<NoteCompact>> GetNotes()
    {
        var dbNotes = await _noteRepository.ReadAll(_userGuid);

        return dbNotes.Select(dbNote =>
                new NoteCompact(dbNote.Guid, dbNote.Title, JsonConvert.DeserializeObject<string[]>(dbNote.Tags), dbNote.DateAdded, dbNote.LastChanged))
            .ToList();
    }

    public async Task<Note> GetSingleNote(Guid guid)
    {
        var dbNote = await _noteRepository.ReadOne(guid, _userGuid);
        var viewNote = new Note(dbNote.Guid, dbNote.Title, dbNote.Content, JsonConvert.DeserializeObject<string[]>(dbNote.Tags), dbNote.DateAdded,
            dbNote.LastChanged);
        return viewNote;
    }

    public async Task<CreateNoteResponse> CreateNote(Note viewNote)
    {
        var guid = Guid.NewGuid();
        var dbNote = new ApiEndpoints.DbModel.Note(guid, _userGuid, viewNote.Title, viewNote.Content, JsonConvert.SerializeObject(viewNote.Tags),
            viewNote.DateAdded, viewNote.LastChanged);
        var success = await _noteRepository.Create(dbNote);
        return new CreateNoteResponse(success, guid);
    }

    public async Task<bool> UpdateNote(Note viewNote)
    {
        var results = new bool[3];
        if (viewNote.Guid == Guid.Empty)
            return false;
        if(!string.IsNullOrEmpty(viewNote.Title))
            results[0] = await _noteRepository.UpdateTitle(viewNote.Guid, viewNote.Title, _userGuid);
        if(!string.IsNullOrEmpty(viewNote.Content))
            results[1] = await _noteRepository.UpdateContent(viewNote.Guid, viewNote.Content, _userGuid);
        if(viewNote.Tags?.Length > 0)
            results[2] = await _noteRepository.UpdateTags(viewNote.Guid, JsonConvert.SerializeObject(viewNote.Tags), _userGuid);
        return results.All(result => result);
    }

    public async Task<bool> DeleteNote(Guid guid)
    {
        return await _noteRepository.Delete(guid, _userGuid);
    }

    private Guid GetUserGuid()
    {
        Guid.TryParse(_httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier), out var userGuid);
        return userGuid;
    }
}