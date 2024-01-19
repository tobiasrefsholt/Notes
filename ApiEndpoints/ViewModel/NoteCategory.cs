namespace ApiEndpoints.ViewModel;

public class NoteCategory
{
    public Guid Guid { get; set; }
    public Guid? ParentGuid { get; set; }
    public string Name { get; set; }

    public NoteCategory(Guid guid, Guid? parentGuid, string name)
    {
        Guid = guid;
        ParentGuid = parentGuid;
        Name = name;
    }

    public NoteCategory()
    {
    }
}