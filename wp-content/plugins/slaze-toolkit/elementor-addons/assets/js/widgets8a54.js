(function ($) {
    "use strict";

	///============= * Item Active Hover  =============\\\
	$(document).on("mouseenter", ".active_hover", function () {
		$(".active_hover").removeClass("active");
		$(this).addClass("active");
	});
    var progressBar = function () {
        function animateCircleProgressBar(element) {
            const percent = parseInt(element.getAttribute('data-percent'), 10);
            const progressElement = element.querySelector('.circle__progress-item-bar, .skill__area-item-content');
            const percentElement = element.querySelector('.circle__progress-item-number, .skill__area-item-content-count');
            let currentPercent = 0;  
            function updateProgress() {
                if (currentPercent <= percent) {
                    progressElement.style.background = `conic-gradient(var(--progressColor) ${currentPercent * 3.6}deg, var(--barColor) 0deg)`;
                    percentElement.textContent = `${currentPercent++}%`;
                    requestAnimationFrame(updateProgress);
                }
            }  
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => entry.isIntersecting && (observer.disconnect(), updateProgress()));
            });
            observer.observe(element);
        }
        document.querySelectorAll('.circle__progress-item, .skill__area-item').forEach(animateCircleProgressBar);
        if($('.skill__area-item-bar').length) {
            $('.skill__area-item-bar').appear(function() {
                var el = $(this);
                var percent = el.data('width');
                $(el).css('width', percent + '%');
            }, {
                accY: 0
            });
        };
    }
    var OffCanvas = function () {
            ///=============  Sidebar Popup  =============\\\
            $(".tOri-offcanvas-popup-icon i, .tOri-offcanvas-popup-icon svg").on("click", function () {
                $(".tOri-offcanvas-popup").addClass("active");
            });
            $(".tOri-offcanvas-popup .sidebar-close-btn").on("click",function () {
                $(".tOri-offcanvas-popup").removeClass("active");
                }
            );
            $(".tOri-offcanvas-popup-icon i, .tOri-offcanvas-popup-icon svg").on("click", function () {
                $(".sidebar-overlay").addClass("show");
            });
            $(".tOri-offcanvas-popup .sidebar-close-btn").on("click",function () {
                $(".sidebar-overlay").removeClass("show");
            }
        );
	}
    var customSearch = function ($scope, $) { 
        $(".tOri-search-icon.open").on("click", function () {
            $(".tOri-search-box")
                .fadeIn()
                .addClass("active");
            }
        );
        $(".tOri-search-box-icon").on("click", function () {
            $(this).fadeIn().removeClass("active");
        });
        $(".tOri-search-box-icon i").on("click", function () {
            $(".tOri-search-box")
                .fadeOut()
                .removeClass("active");
            }
        );
	}
    var BannerSlider = function () {
        var banner_three_thumb = new Swiper(".slide_thumb", {
            spaceBetween: 0,
            slidesPerView: 3,
            freeMode: true,
            watchSlidesProgress: true,
            autoplay: {
                delay: 4500,
                reverseDirection: false,
                disableOnInteraction: false,
            }
        });
        let sliderActive2 = '.slide_three';
        let sliderInit2 = new Swiper(sliderActive2, {
            slidesPerView: 1,
            loop: true,
            effect: 'fade',
            autoplay: {
                delay: 4500,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner_next',
                prevEl: '.banner_prev',
            },
            thumbs: {
                swiper: banner_three_thumb,
            },
        });
    
        ///=============  * Banner Slider  =============\\\
        let sliderActive1 = '.banner-slider';
        let sliderInit1 = new Swiper(sliderActive1, {
            loop: true,
            slidesPerView: 1,
            effect: 'fade',
            autoplay: {
                delay: 5500,
                reverseDirection: false,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.banner_next',
                prevEl: '.banner_prev',
            },
        });
        function animated_swiper(selector, init) {
            let animated = function animated() {
                $(selector + ' [data-animation]').each(function() {
                    let anim = $(this).data('animation');
                    let delay = $(this).data('delay');
                    let duration = $(this).data('duration');
                    $(this).removeClass('anim' + anim).addClass(anim + ' animated').css({
                        webkitAnimationDelay: delay,
                        animationDelay: delay,
                        webkitAnimationDuration: duration,
                        animationDuration: duration
                    }).one('animationend', function() {
                        $(this).removeClass(anim + ' animated');
                    });
                });
            };
            animated();
            init.on('slideChange', function() {
                $(sliderActive1 + ' [data-animation]').removeClass('animated');
                $(sliderActive2 + ' [data-animation]').removeClass('animated');
            });
            init.on('slideChange', animated);
        }
        animated_swiper(sliderActive1, sliderInit1);
        animated_swiper(sliderActive2, sliderInit2);    
    }
    var VideoPopup = function () {
        $('.video-popup').magnificPopup({
            type: 'iframe'
        });
    }
    var WidgetDefault = function ($scope, $) {

	
    }

    $(window).on('elementor/frontend/init', function () {
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-search.default', customSearch);
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-offcanvas.default', OffCanvas);
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-video.default', VideoPopup);
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-skill-bar.default', progressBar);
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-banner-one.default', BannerSlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/slaze-banner-two.default', BannerSlider);
        elementorFrontend.hooks.addAction('frontend/element_ready/widget', WidgetDefault);
    });


})(jQuery);