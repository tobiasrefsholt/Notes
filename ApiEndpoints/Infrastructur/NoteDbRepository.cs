using ApiEndpoints.DbModel;
using ApiEndpoints.DomainServices;
using Dapper;

namespace ApiEndpoints.Infrastructur;

public class NoteDbRepository : INoteRepository
{
    private SqlConnectionFactory _connectionFactory;

    public NoteDbRepository(SqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Note>> ReadAll()
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, Title, Content, Tags, DateAdded, LastChanged
                FROM notes.notes
                LIMIT 100;
            ";
        var dbObjects = await conn.QueryAsync<Note>(sql);
        return dbObjects;
    }

    public async Task<Note?> ReadOne(Guid guid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, Title, Content, Tags, DateAdded, LastChanged
                FROM notes.notes
                WHERE Guid LIKE @Guid;
            ";
        IEnumerable<Note?> dbObjects = await conn.QueryAsync<Note>(sql, new { Guid = guid });
        return dbObjects.FirstOrDefault();
    }

    public async Task<bool> Create(Note note)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                INSERT INTO notes.notes
                VALUES (@Guid, @Title, @Content, @Tags, @DateAdded, @LastChanged)
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, note);
        return rowsAffected > 0;
    }

    public async Task<bool> Delete(Guid guid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                DELETE FROM notes.notes
                WHERE Guid LIKE @Guid
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, new { Guid = guid });
        return rowsAffected > 0;
    }
}