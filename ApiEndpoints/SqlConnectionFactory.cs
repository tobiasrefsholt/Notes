using MySqlConnector;

namespace ApiEndpoints;

public class SqlConnectionFactory
{
    private string _connectionString;

    public SqlConnectionFactory(string connectionString)
    {
        _connectionString = connectionString;
    }

    public MySqlConnection Create()
    {
        return new MySqlConnection(_connectionString);
    }
}