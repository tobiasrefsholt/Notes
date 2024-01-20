namespace ApiEndpoints.ViewModel;

public class NoteCategoryInsert
{
    public Guid? ParentGuid { get; set; }
    public string Name { get; set; }

    public NoteCategoryInsert(Guid? parentGuid, string name)
    {
        ParentGuid = parentGuid;
        Name = name;
    }

    public NoteCategoryInsert()
    {
    }
}