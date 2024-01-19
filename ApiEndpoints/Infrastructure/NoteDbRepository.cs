using ApiEndpoints.DbModel;
using ApiEndpoints.DomainServices;
using Dapper;

namespace ApiEndpoints.Infrastructure;

public class NoteDbRepository : INoteRepository
{
    private SqlConnectionFactory _connectionFactory;

    public NoteDbRepository(SqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<IEnumerable<Note>> ReadAll(Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT n.Guid, n.Title, n.CategoryGuid, c.Name as CategoryName, n.DateAdded, n.LastChanged
                FROM notes.notes as n
                LEFT OUTER JOIN notes.NotesCategories AS c
                    ON CategoryGuid = c.Guid
                WHERE n.User LIKE @User 
                ORDER BY UNIX_TIMESTAMP(LastChanged) DESC
                LIMIT 100;
            ";
        var dbObjects = await conn.QueryAsync<Note>(sql, new { User = userGuid });
        return dbObjects;
    }

    public async Task<IEnumerable<Note>> ReadByCategory(Guid category, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT n.Guid, n.Title, n.CategoryGuid, c.Name as CategoryName, n.DateAdded, n.LastChanged
                FROM notes.notes as n
                LEFT OUTER JOIN notes.NotesCategories AS c
                    ON CategoryGuid = c.Guid
                WHERE n.User LIKE @User 
                    AND n.CategoryGuid LIKE @Category
                ORDER BY UNIX_TIMESTAMP(LastChanged) DESC
                LIMIT 100;
            ";
        var dbObjects = await conn.QueryAsync<Note>(sql, new { Category = category, User = userGuid });
        return dbObjects;
    }

    public async Task<Note?> ReadOne(Guid guid, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT n.Guid, n.Title, n.Content, n.CategoryGuid, c.Name as CategoryName, n.DateAdded, n.LastChanged
                FROM notes.notes as n
                LEFT OUTER JOIN notes.NotesCategories AS c
                    ON CategoryGuid = c.Guid
                WHERE n.Guid LIKE @Guid AND n.User LIKE @UserGuid;
            ";
        IEnumerable<Note?> dbObjects = await conn.QueryAsync<Note>(sql, new { Guid = guid, UserGuid = userGuid });
        return dbObjects.FirstOrDefault();
    }

    public async Task<bool> Create(NoteInsert note)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                INSERT INTO notes.notes
                VALUES (@Guid, @User, @Title, @Content, @CategoryGuid, UTC_TIMESTAMP(), UTC_TIMESTAMP())
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, note);
        return rowsAffected > 0;
    }

    public async Task<bool> Delete(Guid guid, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                DELETE FROM notes.notes
                WHERE Guid LIKE @Guid AND User LIKE @UserGuid
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, new { Guid = guid, UserGuid = userGuid });
        return rowsAffected > 0;
    }

    public async Task<bool> UpdateTitle(Guid guid, string newTitle, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                UPDATE notes.notes
                SET Title = @NewTitle, LastChanged = UTC_TIMESTAMP()
                WHERE Guid LIKE @Guid AND User LIKE @UserGuid
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, new { Guid = guid, NewTitle = newTitle, UserGuid = userGuid });
        return rowsAffected > 0;
    }

    public async Task<bool> UpdateContent(Guid guid, string newContent, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                UPDATE notes.notes
                SET Content = @NewContent, LastChanged = UTC_TIMESTAMP()
                WHERE Guid LIKE @Guid AND User LIKE @UserGuid
          ";
        var rowsAffected =
            await conn.ExecuteAsync(sql, new { Guid = guid, NewContent = newContent, UserGuid = userGuid });
        return rowsAffected > 0;
    }

    public async Task<bool> ChangeCategory(Guid guid, Guid? newCategory, Guid user)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                UPDATE notes.notes
                SET CategoryGuid = @NewCategory, LastChanged = UTC_TIMESTAMP()
                WHERE Guid LIKE @Guid AND User LIKE @UserGuid
          ";
        var rowsAffected =
            await conn.ExecuteAsync(sql, new { Guid = guid, NewCategory = newCategory, UserGuid = user });
        return rowsAffected > 0;
    }
}