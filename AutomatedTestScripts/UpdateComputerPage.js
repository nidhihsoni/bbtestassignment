var updateComputerPage = function() {
    this.heading = element(by.id('main')).element(by.css('h1'));
    this.computerNameLabel = element.all(by.css('label')).get(0);
    this.introducedDateLabel = element.all(by.css('label')).get(1);
    this.discontinuedDateLabel = element.all(by.css('label')).get(2);
    this.companyLabel = element.all(by.css('label')).get(3);

    this.computerNameInput = element(by.id('name'));
    this.introducedDateInput = element(by.id('introduced'));
    this.discontinuedDateInput = element(by.id('discontinued'));
    this.companyLabelInput = element(by.id('company'));
    this.updateComputerButton = element(by.css('[value="Save this computer"]'));
    this.cancelButton = element(by.linkText('Cancel'));
    this.updateComputerError = element(by.css('[class="clearfix error"]'));
    this.deleteButton = element(by.css('[value="Delete this computer"]'));
};
var computerOverviewHomePage = function() {
    this.get = function() {
        browser.driver.get('http://computer-database.herokuapp.com/computers');
    };
    this.searchComputerNameInput = element(by.id('searchbox'));
    this.searchButton = element(by.id('searchsubmit'));
};
var homepageAfterUpdate = function() {
    this.heading = element(by.id('main')).element(by.css('h1'));
    this.updateStatusMessage = element(by.css('.alert-message.warning'));
    this.deleteStatusMessage = element(by.css('.alert-message'));
};

describe('Update a Computer Page', function() {
    beforeEach(function() {
        return browser.ignoreSynchronization = true;
    });
    it('Updatee a Computer Page Regression : TestCase01 : Routing from home page to update page must work', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputer');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputer')).click();

        var updateComputer = new updateComputerPage();
        expect(updateComputer.heading.getText()).toBe('Edit computer');
    });

    it('Updatee a Computer Page Regression : TestCase02 : Display of update computer page must be proper', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputer');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputer')).click();

        var updateComputer = new updateComputerPage();
        expect(updateComputer.heading.getText()).toBe('Edit computer');
        expect(updateComputer.computerNameLabel.getText()).toBe('Computer name');
        expect(updateComputer.introducedDateLabel.getText()).toBe('Introduced date');
        expect(updateComputer.discontinuedDateLabel.getText()).toBe('Discontinued date');
        expect(updateComputer.companyLabel.getText()).toBe('Company');
    });
    it('Update a Computer Page Regression : TestCase03 : Update of computer details must be possible', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputer');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputer')).click();

        var updateComputer = new updateComputerPage();
        updateComputer.computerNameInput.clear().sendKeys('NSTestComputerUpdated');
        updateComputer.introducedDateInput.clear().sendKeys('2017-07-12');
        updateComputer.discontinuedDateInput.clear().sendKeys('2019-07-12');
        updateComputer.companyLabelInput.$('[value="3"]').click();
        updateComputer.updateComputerButton.click();
        var homepageAfterUpdateVar = new homepageAfterUpdate();
        expect(homepageAfterUpdateVar.updateStatusMessage.getText()).toBe('Done! Computer NSTestComputerUpdated has been updated');

    });
    it('Update a Computer Page Regression : TestCase04 : Update a computer without computername must not be possible', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputerUpdated');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputerUpdated')).click();

        var updateComputer = new updateComputerPage();
        updateComputer.computerNameInput.clear();
        updateComputer.updateComputerButton.click();
        expect(updateComputer.updateComputerError.getText()).toBe('Computer name\nRequired');
    });

    it('Update a Computer Page Regression : TestCase05 : Updating a computer with invalid Introduced date must not be possible', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputerUpdated');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputerUpdated')).click();

        var updateComputer = new updateComputerPage();

        updateComputer.introducedDateInput.clear().sendKeys('20-07-2012');
        updateComputer.updateComputerButton.click();
        expect(updateComputer.updateComputerError.getText()).toBe('Introduced date\nDate (\'yyyy-MM-dd\')');
    });
    it('Update a Computer Page Regression : TestCase06 : Updating a computer with invalid Discontinued date must not be possible', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputerUpdated');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputerUpdated')).click();

        var updateComputer = new updateComputerPage();

        updateComputer.discontinuedDateInput.clear().sendKeys('20-07-2018');
        updateComputer.updateComputerButton.click();
        expect(updateComputer.updateComputerError.getText()).toBe('Discontinued date\nDate (\'yyyy-MM-dd\')');

    });
    it('Update a Computer Page Regression : TestCase07 : If cancel is pressed home page must be loaded with Computers overview', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputerUpdated');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputerUpdated')).click();

        var updateComputer = new updateComputerPage();
        updateComputer.cancelButton.click();
        var homepageAfterUpdateVar = new homepageAfterUpdate();
        expect(homepageAfterUpdateVar.heading.getText()).toContain(' computers found');
    });
    it('Update a Computer Page Regression : TestCase08 : If cancel is pressed home page must be loaded with Computers overview', function() {
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestComputerUpdated');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestComputerUpdated')).click();

        var updateComputer = new updateComputerPage();
        updateComputer.deleteButton.click();
        var homepageAfterUpdateVar = new homepageAfterUpdate();
        expect(homepageAfterUpdateVar.deleteStatusMessage.getText()).toBe('Done! Computer has been deleted');

        //DataCleanup
        var computerOverview = new computerOverviewHomePage();
        computerOverview.get();
        computerOverview.searchComputerNameInput.sendKeys('NSTestAllDetails');
        computerOverview.searchButton.click();
        element(by.linkText('NSTestAllDetails')).click();

        var updateComputer = new updateComputerPage();
        updateComputer.deleteButton.click();
        var homepageAfterUpdateVar = new homepageAfterUpdate();
        expect(homepageAfterUpdateVar.deleteStatusMessage.getText()).toBe('Done! Computer has been deleted');

    });
});
