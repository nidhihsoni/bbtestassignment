var computerOverviewPage = function() {
	this.get = function(){
		browser.driver.get('http://computer-database.herokuapp.com/computers');	
	};
	this.heading = element(by.id('main')).element(by.css('h1'));
	this.addNewComputer = element(by.id('add'));
	this.searchComputerNameInput = element(by.id('searchbox'));
	this.searchButton = element(by.id('searchsubmit'));
};


var addNewComputerPage = function() { 
	this.heading = element(by.id('main')).element(by.css('h1'));	
};

describe('Computer Overview Home Page', function() {
	beforeEach(function() {
		return browser.ignoreSynchronization = true;
    });
	it('Computeroverview Homepage Regression : TestCase01 : Header of home page must be correct', function(){
		var computeroverview = new computerOverviewPage();
		computeroverview.get();
		expect(computeroverview.heading.getText()).toContain('computers found');		
	});
	it('Computeroverview Homepage Regression : TestCase02 : add computer button must be visible', function(){
		var computeroverview = new computerOverviewPage();
		computeroverview.get();
		expect(computeroverview.addNewComputer.getText()).toBe('Add a new computer');
	});
	it('Computeroverview Homepage Regression : TestCase03 : Search functionality must work', function(){
		var computeroverview = new computerOverviewPage();
		computeroverview.get();
		computeroverview.searchComputerNameInput.sendKeys('NSTestComputer');
		computeroverview.searchButton.click();
		expect(computeroverview.heading.getText()).toContain('One computer found');
	});
	it('Computeroverview Homepage Regression : TestCase04 : Search functionality must return propeer message if match is not found', function(){
		var computeroverview = new computerOverviewPage();
		computeroverview.get();
		computeroverview.searchComputerNameInput.sendKeys('                                           ');
		computeroverview.searchButton.click();
		expect(computeroverview.heading.getText()).toContain('No computers found');
	});
	it('Computeroverview Homepage Regression : TestCase05 : Navigation to add computer page must work', function() {
		var computeroverview = new computerOverviewPage();
		computeroverview.get();
		computeroverview.addNewComputer.click();
		var addNewComputer = new addNewComputerPage();		
		expect(addNewComputer.heading.getText()).toBe('Add a computer');	
	});
});
