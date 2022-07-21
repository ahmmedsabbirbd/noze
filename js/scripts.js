(function ($) {

    /*** Scroll Down-up */
    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
           $('.header .navbar-nav:not(.navbar-right)').removeClass('active');
        }
    });  

    /*** Sticky header */
    $(window).scroll(function(){
        if($("body").scrollTop() > 0 || $("html").scrollTop() > 0) {
            $(".header").addClass("stop");
        } else {
            $(".header").removeClass("stop");
        }
    });

    const menuBtn = $(".header .navbar-nav:not(.navbar-right)");

    menuBtn.click(function() { 
        menuBtn.toggleClass('active'); 
    });

    $('body').on('click', function (e) {
      if (!$(e.target).is(menuBtn)) {
        $('.header .navbar-nav:not(.navbar-right)').removeClass('active');
      }
    });

    /*** Scroll Nav */
    $('.navbar-nav li a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 90)
            }, 1000, "easeInOutExpo");
            return false;
          }
        }
    });

    var faq_section = $('.faq-section').offset().top;
    function activeLangLink() {
        $(window).scroll(function() {
            var scroll = $(window).scrollTop() + 80;
            if (scroll >= faq_section) {
                $('.header .navbar-nav:not(.navbar-right) li:first-child').removeClass('active');
                $('.header .navbar-nav:not(.navbar-right) li:nth-child(3)').addClass('active');
            } else {
                $('.header .navbar-nav:not(.navbar-right) li:first-child').addClass('active');
                $('.header .navbar-nav:not(.navbar-right) li:nth-child(3)').removeClass('active');
            }   

            if ($(window).width() < 992) {

                if (scroll >= faq_section) {
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(1)').addClass('order-2');
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(2)').addClass('order-3');
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(3)').addClass('order-1');
                } else {
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(1)').removeClass('order-2');
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(2)').removeClass('order-3');
                    $('.header .navbar-nav:not(.navbar-right) li:nth-child(3)').removeClass('order-1');
                }  
            }
        });
    }

    activeLangLink();

    /*** Header height = gutter height */
    function setGutterHeight(){
        var header = document.querySelector('.header'),
            gutter = document.querySelector('.header-gutter');
        if (gutter) {
            gutter.style.height = header.offsetHeight + 'px';
        }
    }
    window.onload = setGutterHeight;
    window.onresize = setGutterHeight;

    /*** tooltip */
    $('[data-toggle="tooltip"]').tooltip();

    /*** fadeInUp.js */
    const customanimation = $('.custom-animation');
    if(customanimation.length > 0){
        window.addEventListener('scroll',animOnScroll);

        function animOnScroll(params){
            for ( let i=0 ; i<customanimation.length; i++ ){
                const animation = customanimation[i];
                const animationHeight = animation.offsetHeight;
                const animationOffset = offset(animation).top;
                const animStart = 4;

                let animationPoint = window.innerHeight - animationHeight/animStart;

                if (animationHeight > window.innerHeight){
                    animationPoint = window.innerHeight - window.innerHeight/animStart
                }

                if ( (pageYOffset > animationOffset - animationPoint) && pageYOffset < (animationOffset+animationHeight) ){
                    animation.classList.add('animation_active');
                } else {
                    if( !animation.classList.contains('animation-no-hide') ){
                        animation.classList.remove('animation_active');
                    }       
                }  
            }
        }

        function offset( el ){
            const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
        }

        setTimeout(() => {
            animOnScroll();
        }, 300);
    }

    if ($(window).width() <= 991) {
        
        /*** matterslider */
        var $matterslick,
            matterisPause;

        $matterslick = $('.matters__item-wrapper');
        $matternav = $('.matters-nav');

        $matterslick.slick({ 
            asNavFor: $matternav,
            arrows: false,
        });

        $matterslick.on({
            mouseenter: function() {
                matterisPause = true;
            },
            mouseleave: function() {
                matterisPause = false;
            }
        });

        $matternav.slick({
            arrows: false,
            dots: true,
            slidesToShow: 1, 
            asNavFor: $matterslick,
            dotsClass: "slick-dots list-inline matter-dots",
        });
    }

    if ($(window).width() > 991) {
         /*** aboutgalleryAnimation.js */
        var galleryBtn1 = $('#about-gallery__slide-1');
        var galleryBtn2 = $('#about-gallery__slide-2');

        const aboutGallerySlider = document.querySelector('.about-gallery__slide-wrapper');
        const aboutGallerySwitcher1 = document.querySelector('#about-gallery__switcher-1');
        const aboutGallerySwitcher2 = document.querySelector('#about-gallery__switcher-2');

        galleryBtn1.click(function(event) {
            clearInterval(toggleLoop);
            $('.about-gallery__slide-media-wrapper').animate({scrollTop: 0}, 300);
            $(galleryBtn1).addClass('active');
            $(galleryBtn2).removeClass('active');
            setTimeout(() => {
                $('.nasa-bottom-text').show();
            }, 500);
        });

        galleryBtn2.click(function(event) {
            clearInterval(toggleLoop);
            $('.about-gallery__slide-media-wrapper').animate({scrollTop: $('.about-gallery__slide-media-wrapper').height()}, 300);
            $(galleryBtn1).removeClass('active');
            $(galleryBtn2).addClass('active');
            $('.nasa-bottom-text').hide();
        });


        if ($(window).width() > 600) {
            var toggleLoop;
            $(window).scroll(function() {
                if(!isOnScreen($('.about-gallery__slide-wrapper'))){
                    $('.about-gallery__slide-media-wrapper').animate({scrollTop: 0}, 0);
                }


                if (isOnScreen($('.about-gallery__slide-wrapper'))) {
                    if(!toggleLoop) {
                        $('#about-gallery__slide-1').addClass('active')
                        $('.about-gallery__slide-media-wrapper').animate({scrollTop: 0}, 0);
                        toggleLoop = setInterval(toggleActive,7000);
                        $('.nasa-bottom-text').show();
                    }
                } else {
                    clearInterval(toggleLoop);
                    toggleLoop = null;
                    $('.about-gallery__slide').removeClass('active') 
                    $('.nasa-bottom-text').hide();
                }
            });
        }

        function toggleActive (){
            $(galleryBtn1).toggleClass('active');
            $(galleryBtn2).toggleClass('active');
            if(galleryBtn1.hasClass('active')){
                $('.about-gallery__slide-media-wrapper').animate({scrollTop: 0}, 300);
                setTimeout(() => {
                    $('.nasa-bottom-text').show();
                }, 500);
            } else{
                $('.about-gallery__slide-media-wrapper').animate({scrollTop: $('.about-gallery__slide-media-wrapper').height()}, 300);
                $('.nasa-bottom-text').hide();
            }
        }

        function isOnScreen(elem) {
            if( elem.length == 0 ) {
                return;
            }
            var $window = jQuery(window)
            var viewport_top = $window.scrollTop()
            var viewport_height = $window.height()
            var viewport_bottom = viewport_top + viewport_height
            var $elem = jQuery(elem)
            var top = $elem.offset().top
            var height = $elem.height()
            var bottom = top + height

            return (top >= viewport_top && top < viewport_bottom) || (bottom > viewport_top && bottom <= viewport_bottom) || (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
        }
        
    } else {
        /*** aboutgalleryslider */
        var $aboutgalleryslick,
            aboutgalleryisPause;

        $aboutgalleryslick = $('.about-gallery__slide-wrapper');
        $aboutgallerynav = $('.about-gallery__slide-media-wrapper');

        $aboutgalleryslick.slick({ 
            asNavFor: $aboutgallerynav,
            arrows: false,
            dots: true,
            dotsClass: "slick-dots list-inline",
        });

        $aboutgalleryslick.on({
            mouseenter: function() {
                aboutgalleryisPause = true;
            },
            mouseleave: function() {
                aboutgalleryisPause = false;
            }
        });

        $aboutgallerynav.slick({
            slidesToShow: 1, 
            arrows: false,
            asNavFor: $aboutgalleryslick, 
        });
    }

    /*** heroVideo */
    var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) { 
        $(".heroVideo video").attr("src","images/noze-portrait.mp4");
        $(".heroVideo div").css("height","77vh");
        var isRunningAnimation = true;
        var scrollGallery = setInterval(function(){
            var position = $('.about-gallery__slide-wrapper').scrollLeft();
            if(position == 0){
                $('.about-gallery__slide-wrapper').animate({scrollLeft: 900}, 100);
            }else{
                $('.about-gallery__slide-wrapper').animate({scrollLeft: 0}, 100);
            }
        },7000)
        var count = 0;
        $('.about-gallery__slide-wrapper').scroll(function(e){
            if($(this).is(':animated')){
                count = 0
            }
            if(count > 23){
                clearInterval(scrollGallery);
            }
            count++;
        })
    } 

    $(window).scroll(function() {
        var height = $(window).scrollTop();
        var heroVideo = $(".heroVideo video").offset()
        var crrTime =  $(".heroVideo video").get(0).currentTime;

        if (isMobile){
            if(height > heroVideo.top - 250){
                if(crrTime == 0){ 
                    $(".heroVideo video").trigger("play"); 
                }
            }else{
                $(".heroVideo video").get(0).currentTime = 0;
                $(".heroVideo video").trigger("pause")
            }
        }else{
            if(height > heroVideo.top - 70 ){
                if(crrTime == 0){ 
                    $(".heroVideo video").trigger("play"); 
                }
            }else{
                $(".heroVideo video").get(0).currentTime = 0;
                $(".heroVideo video").trigger("pause"); 
            }
        }
    });

    /*** BrowserDetect */
    var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Edge", identity: "MSEdge"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
            {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
        ]
    };
    
    BrowserDetect.init();
    document.body.classList.add( BrowserDetect.browser );

}(jQuery));

/*** shoping cart button */ 
(function ($) {
    var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
    
    if (window.ShopifyBuy) {
        if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
        } else {
            loadScript();
        }
    } else {
        loadScript();
    }
    function loadScript() {
        var script = document.createElement('script');
        script.async = true;
        script.src = scriptURL;
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
        script.onload = ShopifyBuyInit;
    }
    function ShopifyBuyInit() {
        var client = ShopifyBuy.buildClient({
            domain: 'getnoze.myshopify.com',
            storefrontAccessToken: 'fb964064382201351acb850f3a26a2a6',
        });
        ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
                id: '6808262738082',
                node: document.getElementById('pre-order'),
                moneyFormat: '%24%7B%7Bamount%7D%7D',
                options: {
                    "product": {
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "calc(25% - 20px)",
                                    "margin-left": "20px",
                                    "margin-bottom": "50px"
                                }
                            },
                            "button": {
                                "font-family": "Raleway, sans-serif",
                                "font-weight": "bold",
                                "font-size": "15px",
                                "padding-top": "15px",
                                "margin-top": "0",
                                "padding-bottom": "15px",
                                ":hover": {
                                    "background-color": "#5b438c"
                                },
                                "background-color": "#654a9b",
                                ":focus": {
                                    "background-color": "#5b438c"
                                },
                                "border-radius": "5px",
                                "padding-left": "32px",
                                "padding-right": "32px",
                            },
                            "quantityInput": {
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px"
                            }
                        },
                        "contents": {
                            "img": false,
                            "title": false,
                            "price": false
                        },
                        "text": {
                            "button": "Pre Order"
                        },
                        "googleFonts": [
                            "Raleway"
                        ]
                    },
                    "productSet": {
                        "styles": {
                            "products": {
                                "@media (min-width: 601px)": {
                                    "margin-left": "-20px"
                                }
                            }
                        }
                    },
                    "modalProduct": {
                        "contents": {
                            "img": false,
                            "imgWithCarousel": true,
                            "button": false,
                            "buttonWithQuantity": true
                        },
                        "styles": {
                            "product": {
                                "@media (min-width: 601px)": {
                                    "max-width": "100%",
                                    "margin-left": "0px",
                                    "margin-bottom": "0px"
                                }
                            },
                            "button": {
                                "font-family": "Raleway, sans-serif",
                                "font-weight": "bold",
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px",
                                "margin-top" : "0px",
                                ":hover": {
                                    "background-color": "#5b438c"
                                },
                                "background-color": "#654a9b",
                                ":focus": {
                                    "background-color": "#5b438c"
                                },
                                "border-radius": "5px",
                                "padding-left": "32px",
                                "padding-right": "32px"
                            },
                            "quantityInput": {
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px"
                            }
                        },
                        "googleFonts": [
                            "Raleway"
                        ],
                        "text": {
                            "button": "Add to Cart"
                        }
                    },
                    "option": {},
                    "cart": {
                        "styles": {
                            "button": {
                                "font-family": "Raleway, sans-serif",
                                "font-weight": "bold",
                                "font-size": "16px",
                                "padding-top": "16px",
                                "padding-bottom": "16px",
                                ":hover": {
                                    "background-color": "#5b438c"
                                },
                                "background-color": "#654a9b",
                                ":focus": {
                                    "background-color": "#5b438c"
                                },
                                "border-radius": "5px"
                            },
                            "title": {
                                "color": "#666666"
                            },
                            "header": {
                                "color": "#666666"
                            },
                            "lineItems": {
                                "color": "#666666"
                            },
                            "subtotalText": {
                                "color": "#666666"
                            },
                            "subtotal": {
                                "color": "#666666"
                            },
                            "notice": {
                                "color": "#666666"
                            },
                            "currency": {
                                "color": "#666666"
                            },
                            "close": {
                                "color": "#666666",
                                ":hover": {
                                    "color": "#666666"
                                }
                            },
                            "empty": {
                                "color": "#666666"
                            },
                            "noteDescription": {
                                "color": "#666666"
                            },
                            "discountText": {
                                "color": "#666666"
                            },
                            "discountIcon": {
                                "fill": "#666666"
                            },
                            "discountAmount": {
                                "color": "#666666"
                            }
                        },
                        "text": {
                            "total": "Subtotal",
                            "button": "Checkout"
                        },
                        "popup": false,
                        "googleFonts": [
                            "Raleway"
                        ]
                    },
                    "toggle": {
                        "styles": {
                            "toggle": {
                                "font-family": "Raleway, sans-serif",
                                "font-weight": "bold",
                                "background-color": "#654a9b",
                                ":hover": {
                                    "background-color": "#5b438c"
                                },
                                ":focus": {
                                    "background-color": "#5b438c"
                                }
                            },
                            "count": {
                                "font-size": "16px"
                            }
                        },
                        "googleFonts": [
                            "Raleway"
                        ]
                    },
                    "lineItem": {
                        "styles": {
                            "variantTitle": {
                                "color": "#666666"
                            },
                            "title": {
                                "color": "#666666"
                            },
                            "price": {
                                "color": "#666666"
                            },
                            "fullPrice": {
                                "color": "#666666"
                            },
                            "discount": {
                                "color": "#666666"
                            },
                            "discountIcon": {
                                "fill": "#666666"
                            },
                            "quantity": {
                                "color": "#666666"
                            },
                            "quantityIncrement": {
                                "color": "#666666",
                                "border-color": "#666666"
                            },
                            "quantityDecrement": {
                                "color": "#666666",
                                "border-color": "#666666"
                            },
                            "quantityInput": {
                                "color": "#666666",
                                "border-color": "#666666"
                            }
                        }
                    },
                },
            });
        });
    }
})();

/*** matters.js */
var marttWrapperTop = $(".matters-section").offset().top;
var imgWrapper = $(".matters__item-wrapper");
var wrapperOffsetHeight = $(".matters-section").outerHeight() -  $(".matters-section-wrapper").outerHeight();
var imgItem = $(".matters__item").outerHeight();
var oneScroll = imgItem;

if ($(window).width() >= 992) {
    $(window).scroll(function () {
        $(".matters-nav li.active").removeAttr("class");
        var scroll = $(window).scrollTop();

        if (scroll >= marttWrapperTop) {
            $(imgWrapper).animate({ scrollTop: scroll - marttWrapperTop }, 0);
        }

        if (scroll <= marttWrapperTop + oneScroll) {
            $(imgWrapper).scrollTop(0);
            $(".matters-nav li:nth-child(1)").addClass("active");
        } else if (
            scroll >= marttWrapperTop &&
            scroll <= marttWrapperTop + oneScroll * 2
        ) {
            $(imgWrapper).scrollTop(imgItem);
            $(".matters-nav li:nth-child(2)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll &&
            scroll <= marttWrapperTop + oneScroll * 3
        ) {
            $(imgWrapper).scrollTop(imgItem * 2);
            $(".matters-nav li:nth-child(3)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 2 &&
            scroll <= marttWrapperTop + oneScroll * 4
        ) {
            $(imgWrapper).scrollTop(imgItem * 3);
            $(".matters-nav li:nth-child(4)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 3 &&
            scroll <= marttWrapperTop + oneScroll * 5
        ) {
            $(imgWrapper).scrollTop(imgItem * 4);
            $(".matters-nav li:nth-child(5)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 4 &&
            scroll <= marttWrapperTop + oneScroll * 6
        ) {
            $(imgWrapper).scrollTop(imgItem * 5);
            $(".matters-nav li:nth-child(6)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 5 &&
            scroll <= marttWrapperTop + oneScroll * 7
        ) {
            $(imgWrapper).scrollTop(imgItem * 6);
            $(".matters-nav li:nth-child(7)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 6 &&
            scroll <= marttWrapperTop + oneScroll * 8
        ) {
            $(imgWrapper).scrollTop(imgItem * 7);
            $(".matters-nav li:nth-child(8)").addClass("active");
        } else if (
            scroll >= marttWrapperTop + oneScroll * 7 &&
            scroll <= marttWrapperTop + oneScroll * 9
        ) {
            $(imgWrapper).scrollTop(imgItem * 8);
            $(".matters-nav li:nth-child(9)").addClass("active");
        } else if (scroll >= marttWrapperTop + oneScroll * 8) {
            $(imgWrapper).scrollTop(imgItem * 9);
            $(".matters-nav li:nth-child(10)").addClass("active");
        }
    });
}
function onClickMattersLinks(val) {
    $("html,body").animate(
        { scrollTop: marttWrapperTop + oneScroll * val + 1 },
        "fast"
    );
}