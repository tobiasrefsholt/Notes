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
                SELECT Guid, User, ParentGuid, Name
                FROM NotesCategories
                WHERE User LIKE @User
            ";
        var dbObjects = await conn.QueryAsync<NoteCategory>(sql, new { User = userGuid });
        return dbObjects;
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

    public Task<bool> Delete(Guid guid, Guid user)
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