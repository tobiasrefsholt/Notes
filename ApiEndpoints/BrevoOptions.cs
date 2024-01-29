namespace ApiEndpoints;

public class BrevoOptions
{
    public const string Position = "Brevo";

    public string ApiKey { get; set; } = string.Empty;
    public string SenderName { get; set; } = string.Empty;
    public string SenderEmail { get; set; } = string.Empty;
}