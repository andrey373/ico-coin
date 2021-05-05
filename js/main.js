$(function(){
    let body = $('body');
    // mobile menu

    let mobileMenu = $('.mobile_menu_block');
    $('.mobile_menu_btn').on('click', function(evt) {
        evt.stopPropagation();
        $(mobileMenu).toggleClass('mobile_menu--open');
    })
    $(mobileMenu).on('click', function(evt){
        evt.stopPropagation();
    });
    $('.mobile_list_link, .mobile_social_link').on('click', function(){
        $(mobileMenu).removeClass('mobile_menu--open');
    });

    $(body).on('click', function(){
        $(mobileMenu).removeClass('mobile_menu--open');
    });

    // accordion 
    let faqQuestion = $('.faq_question');
    let faqCross = $('.faq_cross');
    let crossVerticalLine = $('.cross_vertical_line');
    let faqAnswer = $('.faq_answer');
    $(faqQuestion).on('click', function(){
        $(faqCross).removeClass('faq_cross--active');
        $(this).children('.faq_cross').addClass('faq_cross--active');
        $(crossVerticalLine).removeClass('vertical_line--open');
        $(this).find('.cross_vertical_line').addClass('vertical_line--open');
        $(faqAnswer).slideUp(200);
        $(this).next().slideDown(200);
    });

    
    // circle

    let distribution = $('.distribution').offset().top - $(window).innerHeight() / 1.3;
    $(window).on('scroll', function circleStart(){
        if($(this).scrollTop() >= distribution){
            $('.fifth.circle').circleProgress({
                value: 1,
                size: 320,
                animation: {
                    duration: 3500
                }, 
                fill: {image: "./img/other/gratis.svg" }
            });
            $(this).off('scroll', circleStart);
        }
    });

    // btn to top
    let arrowTop = $('.arrow_top');
    $(window).on('scroll', function(){
        if($(this).scrollTop() >= 800){
            $(arrowTop).addClass('arrow_top--active');
        }else{
            $(arrowTop).removeClass('arrow_top--active');            
        }
    });

    $(arrowTop).on('click', function(){
        $('html').animate({
            scrollTop: 0
        }, 1000);
    });

    // scroll more slowly

    let anchor = $('a[href$="anchor"]');
    $(anchor).on('click', function(evt){
		evt.preventDefault();
       let link = $(this).attr('href');
       $('html, body').animate({
            scrollTop : $(link).offset().top
       }, 1500)
    });

    

    // video 

    $('.video_box').videoExtend({
        logo: './img/icon/logo.png',
        logoSize: [ 100, 40 ]
    });

    let overlayVideo = $('.overlay_video');

    $('.video_btn').on('click', function(){
        $(overlayVideo).addClass('overlay_video--open');
        $(body).addClass('noscroll');
    });

    $(overlayVideo).on('click', function(){
        $(overlayVideo).removeClass('overlay_video--open');
        $(body).removeClass('noscroll');
    });

    $('.video_box').on('click', function(evt){
        evt.stopPropagation();
    });
    
});