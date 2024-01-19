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
                db => new NoteCategory(db.Guid, db.ParentGuid, db.Name))
            .ToList();
    }

    public async Task<bool> CreateCategory(NoteCategory category)
    {
        var generatedGuid = Guid.NewGuid();
        var dbCategory = new ApiEndpoints.DbModel.NoteCategory(generatedGuid, _userGuid, category.ParentGuid,
            category.Name);
        return await _noteCategoryRepository.Create(dbCategory, _userGuid);
    }
}