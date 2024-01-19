namespace ApiEndpoints.ViewModel;

public class NoteCompact
{
    public Guid Guid { get; set; }
    public string Title { get; set; }
    public Guid? CategoryGuid { get; set; }
    public string? CategoryName { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime LastChanged { get; set; }

    public NoteCompact(Guid guid, string title, Guid? categoryGuid, string? categoryName, DateTime dateAdded, DateTime lastChanged)
    {
        Guid = guid;
        Title = title;
        CategoryGuid = categoryGuid;
        CategoryName = categoryName;
        DateAdded = dateAdded;
        LastChanged = lastChanged;
    }

    public NoteCompact()
    {
    }
}