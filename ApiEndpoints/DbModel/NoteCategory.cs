namespace ApiEndpoints.DbModel;

public class NoteCategory
{
    public Guid Guid { get; set; }
    public Guid User { get; set; }
    public Guid ParentGuid { get; set; }
    public string Name { get; set; }
    public int Level { get; set; }

    public NoteCategory(Guid guid, Guid user, Guid parentGuid, string name, int level)
    {
        Guid = guid;
        User = user;
        ParentGuid = parentGuid;
        Name = name;
        this.Level = level;
    }
}