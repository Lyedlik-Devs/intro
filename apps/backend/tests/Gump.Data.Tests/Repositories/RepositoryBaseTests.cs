namespace Gump.Data.Tests.Repositories;

public class BaseRepositoryTests : IDisposable
{
	private readonly CategoryRepository Repository;
	private readonly MongoClient _mongoClient;
	private readonly IMongoDatabase _database;

	public BaseRepositoryTests()
	{
		var connectionString = "mongodb://localhost:27017";
		var databaseName = "GumpTest";
		_mongoClient = new MongoClient(connectionString);
		_database = _mongoClient.GetDatabase(databaseName);
		Repository = new CategoryRepository(connectionString, databaseName);
	}

	public void Dispose()
	{
		_mongoClient.DropDatabase(_database.DatabaseNamespace.DatabaseName);
	}
}
