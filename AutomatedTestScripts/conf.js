//conf.js
exports.config = {
	framework: 'jasmine',
	seleniumAddress: 'http://localhost:4444/wd/hub',
	specs: ['AddComputerPage.js','ComputersOverview.js' ,'UpdateComputerPage.js'
	]
}