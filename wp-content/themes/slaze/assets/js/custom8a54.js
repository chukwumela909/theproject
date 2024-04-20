/*=========================================
* Responsive Menu
* Theme Preloader
* Scroll To Top
=========================================*/
(function ($) {
	"use strict"
	///============= * Responsive Menu  =============\\\
	$('.menu-responsive').meanmenu({
		meanMenuContainer: '.responsive-menu',
		meanScreenWidth: '991',
		meanMenuOpen: '<span></span><span></span><span></span>',
		meanMenuClose: '<i class="fal fa-times"></i>'
	});
	
    ///=============  * Theme Preloader  =============\\\
    $(window).on("load", function () {
        $(".theme-loader").fadeOut(0.0009);
    });
	
    ///=============  * Scroll To Top  =============\\\
	var scrollPath = document.querySelector(".scroll-up path");
	var pathLength = scrollPath.getTotalLength();
	scrollPath.style.transition = scrollPath.style.WebkitTransition = "none";
	scrollPath.style.strokeDasharray = pathLength + " " + pathLength;
	scrollPath.style.strokeDashoffset = pathLength;
	scrollPath.getBoundingClientRect();
	scrollPath.style.transition = scrollPath.style.WebkitTransition = "stroke-dashoffset 10ms linear";
	var updatescroll = function () {
		var scroll = $(window).scrollTop();
		var height = $(document).height() - $(window).height();
		var scroll = pathLength - (scroll * pathLength) / height;
		scrollPath.style.strokeDashoffset = scroll;
	};
	updatescroll();
	$(window).scroll(updatescroll);
	var offset = 50;
	var duration = 950;
	jQuery(window).on("scroll", function () {
		if (jQuery(this).scrollTop() > offset) {
			jQuery(".scroll-up").addClass("active-scroll");
		}
		else {
			jQuery(".scroll-up").removeClass("active-scroll");
		}
	});	
	jQuery(".scroll-up").on("click", function (event) {
	  	event.preventDefault();
	  	jQuery("html, body").animate(
			{ scrollTop: 0, } , duration
		);
	  	return false;
	});
})(jQuery);