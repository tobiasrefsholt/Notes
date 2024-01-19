using ApiEndpoints.DbModel;

namespace ApiEndpoints.DomainServices;

public interface INoteCategoryRepository
{
    Task<IEnumerable<NoteCategory>> ReadCategories(Guid user);
    Task<bool> Create(NoteCategory noteCategory, Guid user);
    Task<bool> Delete(Guid guid, Guid user);
    Task<bool> ChangeParent(Guid guid, Guid user);
    Task<bool> UpdateName(Guid guid, Guid user);
}