namespace ApiEndpoints.DbModel;

public class NoteCategory
{
    public Guid Guid { get; set; }
    public Guid User { get; set; }
    public Guid? ParentGuid { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }

    public NoteCategory(Guid guid, Guid user, Guid? parentGuid, string name, string color)
    {
        Guid = guid;
        User = user;
        ParentGuid = parentGuid;
        Name = name;
        Color = color;
    }
    
    public NoteCategory(Guid guid)
    {
        Guid = guid;
    }

    public NoteCategory()
    {
    }
}