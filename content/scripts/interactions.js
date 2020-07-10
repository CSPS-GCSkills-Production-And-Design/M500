//DO NOT MODIFY ↓
define([
    'jquery'
], function($) {
//DO NOT MODIFY ↑

	function initialize() {
		setEvents();
	}

	function setEvents() {
		$(masterStructure)
			.on("Framework:systemReady", function () {
				$("#wb-bar").children(".top-menu").prepend("<div class=\"banner\"></div><div id=\"current_module\"></div>");
				systemReady();
			})
			.on("Framework:pageLoaded", function () {
				pageLoaded();
			});
			$(document).on("wb-ready.wb-lbx", function(e){
				
				if($(e.target).attr("href").indexOf("#glossary") != -1){
					$(e.target).html('<span class="small_circle">' + $(e.target).html() + "</span>");
				}
			});
	}

	/* is called only once, when the Course has loaded*/
	function systemReady() {
		$(window).resize(function () {
			var $accordion = $(".accordion");
			$accordion.equalHeightColumns('summary');
			$accordion.setAccordionMinHeight();

			var $detailsOn = $accordion.find('details:not(.off)');
			if ($detailsOn.length) {
				var handleInterval = setInterval(function () {
					var $tgl_panelOn = $detailsOn.find('.tgl-panel');
					//var $tgl_content = $tgl_panelOn.find('.tgl-content');
					$tgl_panelOn.setAccordionHeight(handleInterval, $accordion);
				}, 100);
			}

		});

	}

	/* is called on every page load, great for adding custom code to all pages*/
	function pageLoaded() {
		//load the special accordions
		if ($(".accordion.vertical_tabs,.special_tabs").length > 0) {
			specialAccordion();
		}
		if ($(".accordion.horizontal").length > 0) {
			specialAccordion();
		}

		if (!$("html").hasClass("LOM-pageEdit-active")) {
			loadIntro();
			var currentModule = masterStructure.currentSub.getTop().sPosition;
			if (currentModule == 'm0') currentModule = 'Introduction';
			else if (currentModule == 'm6') {
				if ($("html").attr("lang") === "en") {
					currentModule = 'Final Exam';
				} else if ($("html").attr("lang") === "fr") {
					currentModule = 'Examen final';
				}
			} else if (currentModule == 'm7') currentModule = 'Conclusion';
			else currentModule = 'Module ' + currentModule.substr(currentModule.length - 1);
			$('#current_module').html(currentModule);
			
		}
		$(".qs-navgroup").find("button")
			.removeClass("align-right")
			.removeClass("ico-QS-right")
			.removeClass("ico-QS-left")
			.removeClass("snap-sm");

	}


	/* **********************************************************
	 * Accordion functions//
	 * *********************************************************/
	/* Function for equal height columns (wet wb.eqht does not seem to work so.)*/
	(function ($) {
		$.fn.equalHeightColumns = function (childClass) {
			var max = 0;

			if (childClass == undefined) {

				$(this).children().each(function () {
					$(this).outerHeight('auto');
					if ($(this).outerHeight() > max) max = $(this).outerHeight();
				});
				$(this).children().each(function () {
					$(this).outerHeight(max);
				});
			} else {
				$(this).find(childClass).each(function () {
					$(this).css('height', 'auto');
					if ($(this).outerHeight() > max) max = $(this).outerHeight();
				});
				$(this).find(childClass).each(function () {
					$(this).outerHeight(max);
				});
			}

		}
	})(jQuery);

	// Set a minimum Height to tgl-panels to push down content
	(function ($) {
		$.fn.setAccordionMinHeight = function () {
			var $accordion = $(this);
			$accordion.css('height', 'auto');
			$accordion.find('.tgl-panel').each(function () {
				if ($accordion.hasClass('vertical_tabs'))
					$(this).css('min-height', $accordion.outerHeight() + 32);

				else
					$(this).css('min-height', $accordion.outerHeight());
			});
		}
	})(jQuery);
	// Set a minimum Height to accordion based on tgl-panels height  when its visible to push down content
	(function ($) {
		$.fn.setAccordionHeight = function (handle, $accordion) {
			// check if tgl_panel is visible to set height on accordion
			if ($(this).is(':visible')) {
				clearInterval(handle);
				$accordion.css('height', 'auto');

				if ($(this).outerHeight() >= $accordion.outerHeight()) {
					$accordion.css('height', $(this).outerHeight());
				} else if ($accordion.hasClass('accordion')) {
					$accordion.css('height', $accordion.outerHeight() + 32);
				}
			}
		}
	})(jQuery);

	// wait until $(this) object is visible  - receives handle to clear setInterval if needed
	// then check if all panels are open set equal columns
	(function ($) {
		$.fn.checkVisible = function (handle, $accordion) {

			// check if tgl_panel is visible to set height on all panels
			if ($(this).is(':visible')) {
				if (handle != null) {
					clearInterval(handle);
				}

				var allVisible = true;
				$accordion.find('details').each(function () {
					if (!$(this).is('[open]')) {
						allVisible &= false;
					}
				})
				if (allVisible) $accordion.equalHeightColumns('.tgl-panel');
				var atLeastTwoVisible = true;
				$accordion.find('details').each(function () {
					if (!$(this).is('[open]')) {
						atLeastTwoVisible |= true;
					}
				})
				if (atLeastTwoVisible) $accordion.equalHeightColumns('.tgl-panel');
			}
		}
	})(jQuery);

	function specialAccordion() {

		var $accordion = $(".accordion");
		$accordion.equalHeightColumns('summary');
		$accordion.setAccordionMinHeight();

		$('.accordion details').on('click', function () {
			if ($(this).hasClass('off')) {
				var $tgl_panel = $(this).find('.tgl-panel');
				var $tgl_content = $tgl_panel.find('.tgl-content');

				var handleInterval = setInterval(function () {
					//$tgl_panel.setAccordionHeight(handleInterval,$accordion);
					$tgl_content.setAccordionHeight(handleInterval, $tgl_panel);
					$tgl_content.setAccordionHeight(handleInterval, $accordion);
				}, 20);
			}
		});
		

	

		$('.accordion.horizontal details').on('click', function () {
			var $tgl_panel = $(this).first('.tgl-panel');
			// wait for details to open and adjust panel height if all opened
			var handleInterval = setInterval(function () {
			$tgl_panel.checkVisible(handleInterval, $accordion);
			}, 100);
		});		


	}
	/* *******************
	 * this seems a little excessive code-wise ... 
	 * ******************/
	function loadIntro() {
		$(".modIndex").each(function () {
			var modnum = 0;
			var htmlAppend = "";
			var modinfoObj = $(this).find(".module-info").eq(0);
			var modID, thisMod;


			if (modinfoObj.length > 0) {
				for (var mods = 0; mods < masterStructure.subs.length; mods++) {
					thisMod = masterStructure.subs[mods]
					if (!thisMod.isPage) {
						modnum++;
						modID = "mod_" + masterStructure.currentSub.sPosition + "_" + modnum;

						htmlAppend = "<div id=\"" + modID + "\" class=\"" + modinfoObj.attr("class") + "\">";

						$(this).append(htmlAppend + modinfoObj.html() + "</div>");

						$("#" + modID).find(".mod-name").eq(0).html(thisMod.title);
						masterStructure.subs[mods].generateProgress("#" + modID + " .mod-progress", true);


						$("#" + modID).children("h3").find(".modnum").html(modnum - 1);


						$("#" + modID).children(".mod-content").find(".mod-locked ").remove();
						$("#" + modID).addClass("simple-module")
						$("#" + modID).addClass("mod-" + (thisMod.title).substring(0, 3).toLowerCase());

					}
				}
			}
		});

		$(document).ready(function () {
			$(".modIndex").equalHeightColumns();
		});
	}
	//var qsObjParams = {"cheatMode":true,"debugMode":true}
	function fQsEventDispatcher(evt, params) {
		if (evt === "activity_completed") {
			// passed exam
			if (params.activity_successfully_completed) {
				window.unlockPage('m7');
				if ($('.qs-item-failed').length > 0) {
					$('.qs-final-positive-feedback .recap').show();
				}
			}
			// failed exam
			else {
				$('.qs-final-negative-feedback .recap').show();
				//$('.qs-post-feedback').remove(); // remove feedbacks/answers               
			}


		} else if (evt === "activity_started") {
			$('#activity-1').addClass('col-md-8')
		}
	}


	initialize();

});
