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

    public async Task<IEnumerable<NoteCategory>> ReadCategories(Guid userGuid)
    {
        await using var conn = _connectionFactory.Create();
        var sql = @"
                WITH RECURSIVE CategoryHierarchy AS (
                    SELECT Guid, User, ParentGuid, Name
                    FROM NotesCategories
                    WHERE User LIKE @User AND NotesCategories.ParentGuid IS NULL

                    UNION ALL

                    SELECT c.Guid, c.User, c.ParentGuid, c.Name
                    FROM NotesCategories c
                    JOIN CategoryHierarchy ch ON c.ParentGuid = ch.Guid
                )
                SELECT * FROM CategoryHierarchy;
            ";
        var dbObjects = await conn.QueryAsync<NoteCategory>(sql, new { User = userGuid });
        return dbObjects;
    }

    public Task<bool> DeleteCategory(Guid guid, Guid user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> ChangeParent(Guid guid, Guid user)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UpdateName(Guid guid, Guid user)
    {
        throw new NotImplementedException();
    }
}