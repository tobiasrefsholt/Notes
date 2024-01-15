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

    public async Task<IEnumerable<Note>> ReadAll(Guid user)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, Title, Content, Tags, DateAdded, LastChanged
                FROM notes.notes
                WHERE User LIKE @User
                LIMIT 100;
            ";
        var dbObjects = await conn.QueryAsync<Note>(sql, new { User = user });
        return dbObjects;
    }

    public async Task<Note?> ReadOne(Guid guid, Guid user)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, Title, Content, Tags, DateAdded, LastChanged
                FROM notes.notes
                WHERE Guid LIKE @Guid AND User LIKE @User;
            ";
        IEnumerable<Note?> dbObjects = await conn.QueryAsync<Note>(sql, new { Guid = guid });
        return dbObjects.FirstOrDefault();
    }

    public async Task<bool> Create(Note note)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                INSERT INTO notes.notes
                VALUES (@Guid, @User, @Title, @Content, @Tags, @DateAdded, @LastChanged)
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, note);
        return rowsAffected > 0;
    }

    public async Task<bool> Delete(Guid guid, Guid user)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                DELETE FROM notes.notes
                WHERE Guid LIKE @Guid AND User LIKE @User
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, new { Guid = guid, User = user });
        return rowsAffected > 0;
    }

    public Task<bool> UpdateTitle(Guid guid, string newTitle, Guid user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateContent(Guid guid, string newContent, Guid user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateLastChanged(Guid guid, string newLastChanged, Guid user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateTags(Guid guid, string newTags, Guid user)
    {
        throw new NotImplementedException();
    }
}