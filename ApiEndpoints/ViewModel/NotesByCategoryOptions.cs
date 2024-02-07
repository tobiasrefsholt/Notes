namespace ApiEndpoints.ViewModel;

public class NotesByCategoryOptions
{
    public Guid? Guid { get; set; }
    public bool IncludeSubcategories { get; set; }

    public NotesByCategoryOptions(Guid? guid, bool includeSubcategories)
    {
        Guid = guid;
        IncludeSubcategories = includeSubcategories;
    }

    public NotesByCategoryOptions()
    {
    }
}