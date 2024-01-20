namespace ApiEndpoints.ViewModel;

public class CreateDbEntryResponse
{
    public bool Success { get; set; }
    public Guid Guid { get; set; }

    public CreateDbEntryResponse(bool success, Guid guid)
    {
        Success = success;
        Guid = guid;
    }

    public CreateDbEntryResponse()
    {
    }
}