namespace ApiEndpoints.ViewModel;

public class Note
{
    public Guid Guid { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public Guid? CategoryGuid { get; set; }
    public string? CategoryName { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime LastChanged { get; set; }

    public Note(Guid guid, string title, string content, Guid? categoryGuid, string? categoryName, DateTime dateAdded, DateTime lastChanged)
    {
        Guid = guid;
        Title = title;
        Content = content;
        CategoryGuid = categoryGuid;
        CategoryName = categoryName;
        DateAdded = dateAdded;
        LastChanged = lastChanged;
    }

    public Note()
    {
    }
}