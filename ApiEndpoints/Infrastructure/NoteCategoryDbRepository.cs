using ApiEndpoints.DbModel;
using ApiEndpoints.DomainServices;
using Dapper;

namespace ApiEndpoints.Infrastructure;

public class NoteCategoryDbRepository : INoteCategoryRepository
{
    private SqlConnectionFactory _connectionFactory;

    public NoteCategoryDbRepository(SqlConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<NoteCategory?> ReadOne(Guid guid, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, User, ParentGuid, Name
                FROM NotesCategories
                WHERE User LIKE @User
                    AND Guid LIKE @Guid
            ";
        var dbObjects = await conn.QueryAsync<NoteCategory>(sql, new { Guid = guid, User = userGuid });
        return dbObjects.FirstOrDefault();
    }

    public async Task<IEnumerable<NoteCategory>> ReadCategories(Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                SELECT Guid, User, ParentGuid, Name
                FROM NotesCategories
                WHERE User LIKE @User
            ";
        var dbObjects = await conn.QueryAsync<NoteCategory>(sql, new { User = userGuid });
        return dbObjects;
    }

    public async Task<IEnumerable<NoteCategory>> ReadSubCategories(Guid parentCategory, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                WITH RECURSIVE Subcategories AS (
                    SELECT Guid, User, ParentGuid, Name
                    FROM NotesCategories
                    WHERE Guid = @ParentCategory
                        AND User = @User

                    UNION ALL

                    SELECT c.Guid, c.User, c.ParentGuid, c.Name
                    FROM NotesCategories c
                    JOIN Subcategories s ON c.ParentGuid = s.Guid
                )
                SELECT * FROM Subcategories;
            ";
        return await conn.QueryAsync<NoteCategory>(sql, new { ParentCategory = parentCategory, User = userGuid });
    }

    public async Task<bool> Create(NoteCategory noteCategory, Guid user)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                INSERT INTO NotesCategories
                VALUES (@Guid, @User, @ParentGuid, @Name)
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, noteCategory);
        return rowsAffected > 0;
    }

    public async Task<bool> Delete(Guid category, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                DELETE FROM NotesCategories
                WHERE Guid LIKE @Guid
                    AND User LIKE @User
          ";
        var rowsAffected = await conn.ExecuteAsync(sql, new { Guid = category, User = userGuid });
        return rowsAffected > 0;
    }

    public async Task<bool> UpdateParent(Guid category, Guid? parent, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                UPDATE NotesCategories
                SET ParentGuid = @ParentCategory
                WHERE Guid LIKE @ChildCategory AND User LIKE @User
            ";
        var rowsChanged = await conn.ExecuteAsync(sql, new { ChildCategory = category, ParentCategory = parent, User = userGuid });
        return rowsChanged > 0;
    }

    public async Task<bool> UpdateName(Guid category, string newName, Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                UPDATE NotesCategories
                SET Name = @NewName
                WHERE Guid LIKE @Category AND User LIKE @User
            ";
        var rowsChanged = await conn.ExecuteAsync(sql, new { Category = category, NewName = newName, User = userGuid });
        return rowsChanged > 0;
    }
}