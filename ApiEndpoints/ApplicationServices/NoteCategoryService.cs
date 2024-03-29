using ApiEndpoints.ViewModel;
using ApiEndpoints.DomainServices;

namespace ApiEndpoints.ApplicationServices;

public class NoteCategoryService : AppService
{
    private readonly INoteCategoryRepository _noteCategoryRepository;

    public NoteCategoryService(INoteCategoryRepository noteCategoryRepository, HttpContext httpContext) :
        base(httpContext)
    {
        _noteCategoryRepository = noteCategoryRepository;
    }

    public async Task<List<NoteCategory>> GetCategories()
    {
        var dbCategories = await _noteCategoryRepository.ReadCategories(_userGuid);
        return dbCategories.Select(
                db => new NoteCategory(db.Guid, db.ParentGuid, db.Name, db.Color))
            .ToList();
    }

    public async Task<CreateDbEntryResponse> CreateCategory(NoteCategoryInsert category)
    {
        var generatedGuid = Guid.NewGuid();
        var dbCategory = new ApiEndpoints.DbModel.NoteCategory(generatedGuid, _userGuid, category.ParentGuid,
            category.Name, category.Color);
        var success = await _noteCategoryRepository.Create(dbCategory, _userGuid);
        return new CreateDbEntryResponse(success, generatedGuid);
    }

    public async Task<bool> DeleteCategory(Guid categoryGuid, INoteRepository noteRepository)
    {
        var category = await _noteCategoryRepository.ReadOne(categoryGuid, _userGuid);
        if (category == null) return false;
        await MoveNotesToParentCategory(category, noteRepository);
        await MoveSubCategoriesToParent(category);
        return await _noteCategoryRepository.Delete(category.Guid, _userGuid);
    }

    private async Task MoveNotesToParentCategory(DbModel.NoteCategory category, INoteRepository noteRepository)
    {
        var notesInCategory = await noteRepository.ReadByCategory(category.Guid, _userGuid);
        foreach (var note in notesInCategory)
        {
            await noteRepository.ChangeCategory(note.Guid, category.ParentGuid, _userGuid);
        }
    }

    private async Task MoveSubCategoriesToParent(DbModel.NoteCategory categoryToDelete)
    {
        var subCategories = await _noteCategoryRepository.ReadSubCategories(categoryToDelete.Guid, _userGuid);
        foreach (var subCategory in subCategories)
        {
            await _noteCategoryRepository.UpdateParent(subCategory.Guid, categoryToDelete.ParentGuid, _userGuid);
        }
    }

    public async Task<object> UpdateCategory(NoteCategory viewCategory)
    {
        var results = new bool[3];
        if (viewCategory.Guid == Guid.Empty)
            return false;
        if (viewCategory.ParentGuid != Guid.Empty)
            results[0] = await _noteCategoryRepository.UpdateParent(viewCategory.Guid, viewCategory.ParentGuid, _userGuid);
        if (!string.IsNullOrEmpty(viewCategory.Name))
            results[1] = await _noteCategoryRepository.UpdateName(viewCategory.Guid, viewCategory.Name, _userGuid);
        if (!string.IsNullOrEmpty(viewCategory.Color))
            results[2] = await _noteCategoryRepository.UpdateColor(viewCategory.Guid, viewCategory.Color, _userGuid);
        return results.FirstOrDefault(result => result);
    }
}