using System.Security.Claims;
using ApiEndpoints.ViewModel;
using ApiEndpoints.DomainServices;
using Newtonsoft.Json;

namespace ApiEndpoints.ApplicationServices;

public class NoteService : AppService
{
    private readonly INoteRepository _noteRepository;

    public NoteService(INoteRepository noteRepository, HttpContext httpContext) : base(httpContext)
    {
        _noteRepository = noteRepository;
    }

    public async Task<List<NoteCompact>> GetNotes()
    {
        var dbNotes = await _noteRepository.ReadAll(_userGuid);

        return dbNotes.Select(dbNote =>
                new NoteCompact(
                    dbNote.Guid,
                    dbNote.Title,
                    dbNote.CategoryGuid,
                    dbNote.CategoryName,
                    dbNote.DateAdded,
                    dbNote.LastChanged
                ))
            .ToList();
    }
    
    public async Task<List<NoteCompact>> GetNotesByCategory(Guid? categoryGuid)
    {
        var dbNotes = await _noteRepository.ReadByCategory(categoryGuid, _userGuid);

        return dbNotes.Select(dbNote =>
                new NoteCompact(
                    dbNote.Guid,
                    dbNote.Title,
                    dbNote.CategoryGuid,
                    dbNote.CategoryName,
                    dbNote.DateAdded,
                    dbNote.LastChanged
                ))
            .ToList();
    }

    public async Task<Note> GetSingleNote(Guid guid)
    {
        var dbNote = await _noteRepository.ReadOne(guid, _userGuid);
        var viewNote = new Note(
            dbNote.Guid,
            dbNote.Title,
            dbNote.Content,
            dbNote.CategoryGuid,
            dbNote.CategoryName,
            dbNote.DateAdded,
            dbNote.LastChanged);
        return viewNote;
    }

    public async Task<CreateDbEntryResponse> CreateNote(NoteInsert viewNote)
    {
        var guid = Guid.NewGuid();
        var dbNote = new DbModel.NoteInsert(
            guid,
            _userGuid,
            viewNote.Title,
            viewNote.Content,
            viewNote.CategoryGuid
        );
        var success = await _noteRepository.Create(dbNote);
        return new CreateDbEntryResponse(success, guid);
    }

    public async Task<bool> UpdateNote(Note viewNote)
    {
        var results = new bool[3];
        if (viewNote.Guid == Guid.Empty)
            return false;
        if (!string.IsNullOrEmpty(viewNote.Title))
            results[0] = await _noteRepository.UpdateTitle(viewNote.Guid, viewNote.Title, _userGuid);
        if (!string.IsNullOrEmpty(viewNote.Content))
            results[1] = await _noteRepository.UpdateContent(viewNote.Guid, viewNote.Content, _userGuid);
        if (viewNote.CategoryGuid != Guid.Empty)
            results[2] =
                await _noteRepository.ChangeCategory(viewNote.Guid, viewNote.CategoryGuid, _userGuid);
        return results.FirstOrDefault(result => result);
    }

    public async Task<bool> DeleteNote(Guid guid)
    {
        return await _noteRepository.Delete(guid, _userGuid);
    }
}