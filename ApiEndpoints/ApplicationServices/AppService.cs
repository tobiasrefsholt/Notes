using ApiEndpoints.ViewModel;
using ApiEndpoints.DomainServices;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace ApiEndpoints.ApplicationServices;

public class AppService
{
    private INoteRepository _noteRepository;

    public AppService(INoteRepository noteRepository)
    {
        _noteRepository = noteRepository;
    }

    public async Task<List<Note>> GetNotes()
    {
        var dbNotes = await _noteRepository.ReadAll();

        return dbNotes.Select(dbNote =>
            new Note(dbNote.Guid, dbNote.Title, dbNote.Content, dbNote.Tags, dbNote.DateAdded, dbNote.LastChanged)).ToList();
    }

    public async Task<Note> GetSingleNote(Guid guid)
    {
        var dbNote = await _noteRepository.ReadOne(guid);
        var viewNote = new Note(dbNote.Guid, dbNote.Title, dbNote.Content, dbNote.Tags, dbNote.DateAdded, dbNote.LastChanged);
        return viewNote;
    }

    public async Task<bool> CreateNote(Note viewNote)
    {
        var guid = Guid.NewGuid();
        var dbNote = new ApiEndpoints.DbModel.Note(guid, viewNote.Title, viewNote.Content, viewNote.Tags, viewNote.DateAdded, viewNote.LastChanged);
        return await _noteRepository.Create(dbNote);
    }

    public async Task<bool> DeleteNote(Guid guid)
    {
        return await _noteRepository.Delete(guid);
    }
}