/**
 * Author:
 * Fabz
 */

// Create a closure to maintain scope of the '$' and FBZ (Kickoff)
;(function(FBZ, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		FBZ.Config.init();

	});// END DOC READY
	FBZ.model = {
		// add your data here 
		windowH	: FBZ.control.getHeight(FBZ.dom.$stage),
		windowW	: FBZ.control.getWidth(FBZ.dom.$stage),
		stageH	: window.innerHeight,
		stageW	: window.innerWidth,
	},

	FBZ.view = {

		// add dom elements here
		$stage 		:$(window),
		$header		:$('header'),
		$container	:$('container'),
		$footer		:$('footer')
	},

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('Kickoff is running');
		},

		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
	};
	// Example module
	/*
	FBZ.MyExampleModule = {
		init : function () {
			FBZ.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.FBZ = window.FBZ || {}, jQuery);
