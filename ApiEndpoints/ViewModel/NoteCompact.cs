namespace ApiEndpoints.ViewModel;

public class NoteCompact
{
    public Guid Guid { get; set; }
    public string Title { get; set; }
    public string[]? Tags { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime LastChanged { get; set; }

    public NoteCompact(Guid guid, string title, string[]? tags, DateTime dateAdded, DateTime lastChanged)
    {
        Guid = guid;
        Title = title;
        Tags = tags;
        DateAdded = dateAdded;
        LastChanged = lastChanged;
    }

    public NoteCompact()
    {
    }
}