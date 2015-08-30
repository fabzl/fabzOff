/*	Author: Fabz
		Fabzoff
*/

// --------------------------------------------- //
// DEFINE GLOBAL LIBS                            //
// --------------------------------------------- //
window.jQuery = window.$ = require('../../../node_modules/jquery/dist/jquery.js');


// force compilation of global libs that don't return a value.
require("./helpers/log");


//initialise FBZ object
var FBZ = {};

FBZ.Config = {

	init : function () {
		console.debug('Kickoff is running');

		// Example module include
		FBZ.UI = require('./modules/UI');
		FBZ.UI.init();
	}
};


KO.Config.init();
