/**
 * Author:
 * Fabz
 */

// require("./libs/skrollr");
// require("./libs/picturefill");

// Create a closure to maintain scope of the '$' and FBZ
;(function(FBZ, $) {

		$(window).load(function() {

		});


	$(function() {

		// initial functions 
		FBZ.control.readFromGoogleDocs();
		FBZ.control.determineSection();
		FBZ.control.onResizeStage();
		FBZ.control.defineStage();
		FBZ.control.resizeContentBlock();

	});// END DOC READY
	
	FBZ.model = {
		// add your data here 

		windowH	: 0, //browser screen 
		windowW	: 0,
		stageH	: window.innerHeight, //total document size
		stageW	: window.innerWidth,
		stateObj : {},
		currentSection : "home",
		currentArticule : "",
		currentSectionIndex : 0,
		i18n : null,
		noBrain : {},
		currentLang:"es",
		$selectedform : {},
		// js detection
		mobileMode:false,
		tabletMode:false,
		desktopMode:false,
		// value holders
		swapToMobileBreakpoint:420,
		swapToTabletBreakpoint:1024,

	};

	FBZ.view = {

		// add dom elements here
		$stage 				:$(window),
		$header				:$('header'),
		$main				:$('.main'),
		$block				:$('.block'),
		$langBtn			:$('.lang-btn'),
		$footer				:$('footer')
	};

	FBZ.control = {
		// add function here
		init : function () {
			console.debug('FabzOff is running');
		},

		detectPlatform : function () {

			console.log("js platform detection : ");
			if(FBZ.model.stageW < FBZ.model.swapToMobileBreakpoint) {

				console.log("mobile");
				// boolean to control the vertical positioning
				FBZ.model.mobileMode = true;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = false;

			// if this brakpoint condition is met display the tablet mode	
			}else if(FBZ.model.stageW < FBZ.model.swapToTabletBreakpoint) { 

				console.log("tablet");

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = true;
				FBZ.model.desktopMode = false;

			}else {

				FBZ.model.mobileMode = false;
				FBZ.model.tabletMode = false;
				FBZ.model.desktopMode = true;

				console.log("desktop");

			}

		},

		removeLoadingCurtain : function() { 
			FBZ.control.fadeHide($(".curtain"));
		},

		determineSection : function () { 
			// this function determines the current page and assign it to a string

			var section = window.location.href.split("/");

			// console.log("section length :",section.length);

			if ( section.length <= 4 ) {

					FBZ.model.currentSection = "home";

			} else {
					FBZ.model.currentSection  = section[section.length-2];
			}

			FBZ.model.currentArticule  = section[section.length-1];
			//console.log(FBZ.model.currentSection);
		}, 

		sectionMonitor : function (index) { 

			FBZ.control.determineSection();
			FBZ.model.currentSectionIndex = index;
		},

		animate : function (element,animClass) {

				if(element.hasClass("is-hidden")) {
					element.removeClass("is-hidden");
				}
				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);
		},

		animateAndHide : function (element,animClass,time) {

				if(element.hasClass(animClass) )  {
					element.removeClass(animClass);
					element.css("offsetWidth" , element.get(0).offsetWidth);
				}
				element.addClass(animClass);

				setTimeout(function(){ 
					element.addClass("is-hidden");
				}, time);
		},
		parseBrain : function () {

			// triggers the init func
			FBZ.control.init();
			FBZ.control.multilingualEngine(); 
			FBZ.control.removeLoadingCurtain();
			//FBZ.control.updateLanguage();
		},

		fadeHide : function (el) { 

			el.addClass("is-fading-out");

			setTimeout(function(){ 
				el.addClass("is-hidden");
				el.removeClass("is-fading-out");
			}, 701);
		},

		fadeShow : function (el) { 

			el.addClass("is-fading-in");
			el.removeClass("is-hidden");

			setTimeout(function(){ 

				el.removeClass("is-fading-in");
			}, 701);
		},


		readFromGoogleDocs : function () { 

			// https://docs.google.com/spreadsheets/d/1T0qB23t_Lc17VrtnybisyjVsfufbM3trJ9QGNjJUspo/pubhtml

			Tabletop.init( { key: 'https://docs.google.com/spreadsheets/d/1T0qB23t_Lc17VrtnybisyjVsfufbM3trJ9QGNjJUspo/pubhtml',
				callback: function(data, tabletop) { 
					console.dir(data) 
					FBZ.model.noBrain = data;
					FBZ.control.parseBrain();
				} } )
		},

		multilingualEngine : function () {

			// multilingual plugin config . 

			i18n = window.domI18n({
				selector: '[data-translatable]',
				separator: ' // ',
				languages: ['es', 'en'],
				defaultLanguage: 'es'
			});
			
			FBZ.view.$langBtn.click(function(){
				
				var languageSelected = $(this).attr('lang');
				FBZ.control.changeLanguage(languageSelected);
			//	console.log("change language to :",languageSelected);
				
				var buttons = $.find(".lang-btn");
				for(var i = 0 ; i < buttons.length ; i ++ ) { 
					$(buttons[i]).removeClass("active");
					// console.dir(buttons[i],buttons[i]);
				//	if (buttons[i].hasClass("active")) {
				//	}
				}
			//	console.log($.find(".lang-btn").hasClass("active").removeClass("active" ));	
				$(this).addClass("active" );
			});

			FBZ.control.updateLanguage();
		},
		
		updateLanguage : function () {

			FBZ.control.changeLanguage(FBZ.model.currentLang);
		},

		changeLanguage : function (language) { 

			i18n.changeLanguage(language);
		//	console.log("changeLanguage");
			FBZ.model.currentLang = language;
		},

		getHeight : function (obj) {

			var value = obj.height();
			return value;
		},

		getWidth : function(obj) {

			var value = obj.width();
			return value;
		},
		defineStage : function ( ) { 

			FBZ.model.stageH = FBZ.control.getHeight(FBZ.view.$stage);
			FBZ.model.stageW = FBZ.control.getWidth(FBZ.view.$stage);
			FBZ.control.detectPlatform();

		//	console.log("def stage", FBZ.model.stageH, FBZ.model.stageW );

		},

		// function to trigger when you resize stage
		onResizeStage : function ()  { 

			$(window).resize(function() {
				// to re - resize the layout . 
				FBZ.control.defineStage();
				FBZ.control.resizeContentBlock();

			}.debounce(150));

		},

		resizeContentBlock : function () { 
			FBZ.view.$block.css("width",FBZ.model.stageW);
			FBZ.view.$block.css("height",FBZ.model.stageH);
		},

		toCamelCase: function (str){
			return str.toLowerCase().replace(/(\-[a-z])/g, function($1){
				return $1.toUpperCase().replace('-','');
			});
		},

		setCss3Style: function (el,prop,val){

			var vendors = ['-moz-','-webkit-','-o-','-ms-','-khtml-',''];

			for(var i=0,l=vendors.length;i<l;i++)
				{
					var p = FBZ.control.toCamelCase(vendors[i] + prop);
					if(p in el.style)
						el.style[p] = val;
				}
		}
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

// multilingual support obj
var i18n;

// debounce prototype
Function.prototype.debounce = function (milliseconds) {
    var baseFunction = this,
        timer = null,
        wait = milliseconds;

    return function () {
        var self = this,
            args = arguments;

        function complete() {
            baseFunction.apply(self, args);
            timer = null;
        }

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(complete, wait);
    };
};

