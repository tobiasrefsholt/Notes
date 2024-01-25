using ApiEndpoints.DbModel;

namespace ApiEndpoints.DomainServices;

public interface INoteCategoryRepository
{
    Task<NoteCategory?> ReadOne(Guid category, Guid user);
    Task<IEnumerable<NoteCategory>> ReadCategories(Guid user);
    Task<IEnumerable<NoteCategory>> ReadSubCategories(Guid parentCategory, Guid user);
    Task<bool> Create(NoteCategory category, Guid user);
    Task<bool> Delete(Guid category, Guid user);
    Task<bool> UpdateParent(Guid category, Guid? parent, Guid user);
    Task<bool> UpdateName(Guid category, string newName, Guid user);

}