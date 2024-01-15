using ApiEndpoints.DbModel;

namespace ApiEndpoints.DomainServices;

public interface INoteRepository
{
    Task<IEnumerable<Note>> ReadAll();
    Task<Note?> ReadOne(Guid guid);
    Task<bool> Create(Note note);
    Task<bool> Delete(Guid guid);
}