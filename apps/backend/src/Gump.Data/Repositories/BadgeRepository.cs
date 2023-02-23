using Gump.Data.Models;
using MongoDB.Driver;

namespace Gump.Data.Repositories;

public class BadgeRepository : RepositoryBase<BadgeModel>
{
	public BadgeRepository(string connectionString) : base(connectionString) { }

	public BadgeModel Create(BadgeModel badge)
	{

		if (GetAll().Any(x => x.Name == badge.Name))
		{
			throw new ArgumentException($"Badge already exists with name {badge.Name}");
		}

		badge.Id = GetId();

		ValidateFields(badge, "Name", "Description", "ImageUrl");

		try
		{
			Collection.InsertOne(badge);
		}
		catch (MongoException ex)
		{
			throw new Exception("Error while creating badge", ex);
		}

		return badge;
	}

	public BadgeModel GetById(ulong id)
	{
		BadgeModel badge = Collection.AsQueryable().FirstOrDefault(x => x.Id == id);

		ValidateFields(badge, "Id");

		return badge;
	}

	public List<BadgeModel> GetAll()
	{
		return Collection.AsQueryable().ToList();
	}

	public BadgeModel Update(BadgeModel badge)
	{
		ValidateAllFields(badge);

		if (GetAll().Any(x => x.Name == badge.Name && x.Id != badge.Id))
		{
			throw new ArgumentException($"Badge already exists with name {badge.Name}");
		}

		try
		{
			Collection.ReplaceOne(x => x.Id == badge.Id, badge);
		}
		catch (MongoException ex)
		{
			throw new Exception("Error while updating badge", ex);
		}

		return badge;
	}

	public void Delete(ulong id)
	{
		try
		{
			Collection.DeleteOne(x => x.Id == id);
		}
		catch (MongoException ex)
		{
			throw new Exception("Error while deleting badge", ex);
		}
	}
}
