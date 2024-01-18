using ApiEndpoints.DbModel;

namespace ApiEndpoints.DomainServices;

public interface INoteRepository
{
    Task<IEnumerable<Note>> ReadAll(Guid user);
    Task<Note?> ReadOne(Guid guid, Guid user);
    Task<bool> Create(Note note);
    Task<bool> Delete(Guid guid, Guid user);
    Task<bool> UpdateTitle(Guid guid, string newTitle, Guid user);
    Task<bool> UpdateContent(Guid guid, string newContent, Guid user);
    Task<bool> UpdateTags(Guid guid, string newTags, Guid user);
}