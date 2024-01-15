namespace ApiEndpoints.DbModel;

public class Note
{
    public Guid Guid { get; set; }
    public Guid User { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public string Tags { get; set; }
    public DateTime DateAdded { get; set; }
    public DateTime LastChanged { get; set; }

    public Note(Guid guid, Guid user, string title, string content, string tags, DateTime dateAdded, DateTime lastChanged)
    {
        Guid = guid;
        User = user;
        Title = title;
        Content = content;
        Tags = tags;
        DateAdded = dateAdded;
        LastChanged = lastChanged;
    }

    public Note()
    {
    }
}