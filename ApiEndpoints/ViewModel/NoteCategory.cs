namespace ApiEndpoints.ViewModel;

public class NoteCategory
{
    public Guid Guid { get; set; }
    public Guid? ParentGuid { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }

    public NoteCategory(Guid guid, Guid? parentGuid, string name, string color)
    {
        Guid = guid;
        ParentGuid = parentGuid;
        Name = name;
        Color = color;
    }

    public NoteCategory()
    {
    }
}