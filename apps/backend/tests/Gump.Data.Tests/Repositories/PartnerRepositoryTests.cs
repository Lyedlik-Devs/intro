namespace Gump.Data.Tests.Repositories;

[Collection("RepositoryTests")]
public class PartnerRepositoryTests : RepositoryTestsBase, IClassFixture<RepositoryTestsBase>
{
	private readonly RepositoryTestsBase fixture;
	public PartnerRepositoryTests(RepositoryTestsBase fixture)
	{
		this.fixture = fixture;
	}

	[Fact]
	public void GetById_Works()
	{
		// Arrange & Act
		PartnerModel partner = Get<PartnerModel>();
		fixture.PartnerRepository.Create(partner);
		PartnerModel partner2 = fixture.PartnerRepository.GetById(partner.Id);

		// Assert
		Assert.Equal(partner.Id, partner2.Id);
		Assert.Equal(partner.Name, partner2.Name);
	}


	[Theory]
	[InlineData("First")]
	public void Create_CannotCreateDuplicate(string name)
	{
		// Arrange
		PartnerModel partner = Get<PartnerModel>();

		// Act
		partner.Name = name;
		fixture.PartnerRepository.Create(partner);

		// Assert
		Assert.Equal(name, partner.Name);
		Assert.Throws<DuplicateException>(() => fixture.PartnerRepository.Create(partner));
	}

	[Theory]
	[InlineData("First", "Second")]
	public void Update_CannotUpdateToExistingName(string name, string name2)
	{
		// Arrange
		PartnerModel partner = Get<PartnerModel>();
		partner.Name = name;
		fixture.PartnerRepository.Create(partner);

		PartnerModel partner2 = Get<PartnerModel>();
		partner2.Name = name2;
		fixture.PartnerRepository.Create(partner2);

		// Act
		partner.Name = name2;

		// Assert
		Assert.Equal(name2, partner.Name);
		Assert.Equal(name2, partner2.Name);
		Assert.Throws<DuplicateException>(() => fixture.PartnerRepository.Update(partner));
	}

	[Theory]
	[InlineData("First")]
	public void Delete_WithNoAds_Works(string name)
	{
		// Arrange
		PartnerModel partner = Get<PartnerModel>();
		partner.Name = name;
		partner.Ads = new List<ulong>();
		fixture.PartnerRepository.Create(partner);

		// Act
		fixture.PartnerRepository.Delete(partner.Id);

		// Assert
		Assert.Throws<NotFoundException>(() => fixture.PartnerRepository.GetById(partner.Id));
	}

	[Theory]
	[InlineData("First")]
	public void Delete_WithNoAds_CannotDeleteNonExistent(string name)
	{
		// Arrange
		PartnerModel partner = Get<PartnerModel>();
		partner.Name = name;
		partner.Ads = new List<ulong>();
		fixture.PartnerRepository.Create(partner);

		// Act
		fixture.PartnerRepository.Delete(partner.Id);

		// Assert
		Assert.Throws<NotFoundException>(() => fixture.PartnerRepository.Delete(partner.Id));
	}

	[Theory]
	[InlineData("First")]
	public void Delete_WithAds_CannotDeleteNonExistent(string name)
	{
		// Arrange
		PartnerModel partner = Get<PartnerModel>();
		partner.Name = name;
		fixture.PartnerRepository.Create(partner);

		ImageModel image = Get<ImageModel>();
		fixture.ImageRepository.Create(image);

		AdvertModel advert = Get<AdvertModel>();
		advert.PartnerId = partner.Id;
		fixture.AdvertRepository.Create(advert);

		// Act
		fixture.PartnerRepository.Delete(partner.Id);

		// Assert
		Assert.Throws<NotFoundException>(() => fixture.PartnerRepository.Delete(partner.Id));
	}

}
