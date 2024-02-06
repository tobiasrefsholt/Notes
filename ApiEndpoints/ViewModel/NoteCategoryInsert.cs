namespace ApiEndpoints.ViewModel;

public class NoteCategoryInsert
{
    public Guid? ParentGuid { get; set; }
    public string Name { get; set; }
    public string Color { get; set; }

    public NoteCategoryInsert(Guid? parentGuid, string name, string color)
    {
        ParentGuid = parentGuid;
        Name = name;
        Color = color;
    }

    public NoteCategoryInsert()
    {
    }
}