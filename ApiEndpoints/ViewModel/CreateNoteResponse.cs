namespace ApiEndpoints.ViewModel;

public class CreateNoteResponse
{
    public bool Success { get; set; }
    public Guid Guid { get; set; }

    public CreateNoteResponse(bool success, Guid guid)
    {
        Success = success;
        Guid = guid;
    }

    public CreateNoteResponse()
    {
    }
}