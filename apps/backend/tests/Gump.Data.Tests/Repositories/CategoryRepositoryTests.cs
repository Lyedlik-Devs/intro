namespace Gump.Data.Tests.Repositories;

public class CategoryRepositoryTests : IClassFixture<BaseRepositoryTests>
{
	private readonly BaseRepositoryTests fixture;

	public CategoryRepositoryTests(BaseRepositoryTests fixture)
	{
		this.fixture = fixture;
	}

	[Fact]
	public void Create()
	{
		// Arrange
		string name = "Test";

		// Act
		CategoryModel category = fixture.Repository.Create(name);

		// Assert
		Assert.Equal(name, category.Name);
		Assert.Throws<ArgumentException>(() => fixture.Repository.Create(name));
	}

	[Fact]
	public void Update()
	{
		// Arrange
		string name = "Test";
		CategoryModel category = fixture.Repository.Create(name);

		// Act
		category.Name = "Test2";
		fixture.Repository.Update(category);

		// Assert
		Assert.Equal("Test2", category.Name);
		Assert.Throws<ArgumentException>(() => fixture.Repository.Update(category));
	}

	[Fact]
	public void Delete()
	{
		// Arrange
		string name = "Test";
		CategoryModel category = fixture.Repository.Create(name);

		// Act
		fixture.Repository.Delete(category.Id);

		// Assert
		Assert.Throws<NullReferenceException>(() => fixture.Repository.Delete(category.Id));
	}
}

