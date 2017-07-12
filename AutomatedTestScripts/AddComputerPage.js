var addComputerPage = function(){
	this.get = function(){
		browser.driver.get('http://computer-database.herokuapp.com/computers/new');		
	};
	this.heading = element(by.id('main')).element(by.css('h1'));
	this.computerNameLabel = element.all(by.css('label')).get(0);
	this.introducedDateLabel = element.all(by.css('label')).get(1);
	this.discontinuedDateLabel = element.all(by.css('label')).get(2);
	this.companyLabel = element.all(by.css('label')).get(3);
	
	this.computerNameInput = element(by.id('name'));
	this.introducedDateInput = element(by.id('introduced'));
	this.discontinuedDateInput = element(by.id('discontinued'));
	this.companyLabelInput = element(by.id('company'));
	this.addComputerButton = element(by.css('[value="Create this computer"]'));
	this.cancelButton = element.all(by.css('.btn')).last();
	this.addComputerError = element(by.css('[class="clearfix error"]'));
};
var computerOverviewHomepage = function() {
	this.heading = element(by.id('main')).element(by.css('h1'));	
	this.statusMessage = element(by.css('.alert-message'));	
};
	describe('Add a Computer Page', function(){
		beforeEach(function(){
			return browser.ignoreSynchronization = true;
		});
		it('Add a Computer Page Regression : TestCase01 : Display of add computer page must be proper', function() {
			var addComputer = new addComputerPage();
			addComputer.get();
			expect(addComputer.heading.getText()).toBe('Add a computer');	
			expect(addComputer.computerNameLabel.getText()).toBe('Computer name');
			expect(addComputer.introducedDateLabel.getText()).toBe('Introduced date');
			expect(addComputer.discontinuedDateLabel.getText()).toBe('Discontinued date');
			expect(addComputer.companyLabel.getText()).toBe('Company');
		});
		it('Add a Computer Page Regression : TestCase02 : Adding a computer with only computer name must be possible', function() {
			var addComputer = new addComputerPage();
			addComputer.get();			
			addComputer.computerNameInput.sendKeys('NSTestComputer');
		    addComputer.addComputerButton.click();			
			var computerOverview = new computerOverviewHomepage();
			expect(computerOverview.statusMessage.getText()).toBe('Done! Computer NSTestComputer has been created');	
		});
		it('Add a Computer Page Regression : TestCase03 : Adding a computer without computername must not be possible', function() {
			var addComputer = new addComputerPage();
			addComputer.get();			
		    addComputer.addComputerButton.click();
			expect(addComputer.addComputerError.getText()).toBe('Computer name\nRequired');		
		});
		it('Add a Computer Page Regression : TestCase04 : Adding a computer with all valid input must be possible', function() {
			var addComputer = new addComputerPage();
			addComputer.get();			
			addComputer.computerNameInput.sendKeys('NSTestAllDetails');
			addComputer.introducedDateInput.sendKeys('2017-07-12');
			addComputer.discontinuedDateInput.sendKeys('2019-07-12');
			addComputer.companyLabelInput.$('[value="3"]').click();
			addComputer.addComputerButton.click();			
			var computerOverview = new computerOverviewHomepage();
			expect(computerOverview.statusMessage.getText()).toBe('Done! Computer NSTestAllDetails has been created');
		});
		it('Add a Computer Page Regression : TestCase05 : Adding a computer with invalid Introduced date must not be possible', function() {
			var addComputer = new addComputerPage();
			addComputer.get();			
			addComputer.computerNameInput.sendKeys('NSTestAllDetails');
			addComputer.introducedDateInput.sendKeys('12-07-2017');
			addComputer.discontinuedDateInput.sendKeys('2019-07-12');			
			addComputer.addComputerButton.click();			
			expect(addComputer.addComputerError.getText()).toBe('Introduced date\nDate (\'yyyy-MM-dd\')');	
		});
		it('Add a Computer Page Regression : TestCase06 : Adding a computer with invalid Discontinued date must not be possible', function() {
			var addComputer = new addComputerPage();
			addComputer.get();			
			addComputer.computerNameInput.sendKeys('NSTestAllDetails');
			addComputer.introducedDateInput.sendKeys('2019-07-12');
			addComputer.discontinuedDateInput.sendKeys('12-07-2018');			
			addComputer.addComputerButton.click();			
			expect(addComputer.addComputerError.getText()).toBe('Discontinued date\nDate (\'yyyy-MM-dd\')');	
		});
		it('Add a Computer Page Regression : TestCase07 : If cancel is pressed home page must be loaded with Computers overview', function() {
			var addComputer = new addComputerPage();
			addComputer.get();	
			addComputer.cancelButton.click();
			var computerOverview = new computerOverviewHomepage();
			expect(computerOverview.heading.getText()).toContain('computers found');
		});
		
	});
	
