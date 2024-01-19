namespace ApiEndpoints.ViewModel;

public class NoteInsert
{
    public Guid Guid { get; set; }
    public Guid User { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public Guid? CategoryGuid { get; set; }

    public NoteInsert(Guid guid, Guid user, string title, string content, Guid? categoryGuid)
    {
        Guid = guid;
        User = user;
        Title = title;
        Content = content;
        CategoryGuid = categoryGuid;
    }

    public NoteInsert()
    {
    }
}