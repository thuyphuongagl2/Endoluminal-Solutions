
if (location.hash) {
  const tempHash = location.hash;
  history.replaceState(null, '', location.pathname + location.search);
  window.__pendingHashScroll = tempHash;
}
$(document).ready(function () {
  /* ======================================
  menu
  ====================================== */
  $(document).on('click', '.js-menu', function () {
    $(this).toggleClass('active')
    $(".header, .header__content").toggleClass("is-active");
    if ($(window).width() < 768) {
      if ($(this).hasClass('active')) {
        $('body').addClass('lock');
      }
      else {
        $('body').removeClass('lock');
      }
    }
  });
  // Throttled scroll handler — combines header fix + scroll-to-top in one RAF
  var scrollTicking = false;
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 0) {
      $('.header').addClass('fix');
    } else {
      $('.header').removeClass('fix');
    }
  });
  /* ======================================
  mv height
  ====================================== */
  // $(document).ready(function() {
  //   function setMVHeight() {
  //     if ($(window).width() <= 768) {
  //       const windowHeight = $(window).innerHeight();
  //       const bannerHeight = $('.fixed__banner').outerHeight() || 0;
  //       const paddingTop = parseInt($('.mv').css('padding-top')); 
  //       $('.mv').height(windowHeight - bannerHeight - paddingTop); 
  //     } else {
  //       $('.mv').css('height', '');
  //     }
  //   }
  //   setMVHeight(); 
  //   $(window).resize(setMVHeight);
  // });

  /* ======================================
  nav hover
  ====================================== */
  if ($(window).width() > 768 && $('.header__nav').length) {
    $(document).on('mouseenter', '.header__nav > ul > li', function () {
      $(this).find('.subInner').addClass('active');
      $(this).find('.menu__title, .menu__link').addClass('active');
    });
    $(document).on('mouseleave', '.header__nav > ul > li', function () {
      $(this).find('.subInner').removeClass('active');
      $(this).find('.menu__title, .menu__link').removeClass('active');
    });
  }
  /* ======================================
  subnmenu
  ====================================== */
  $('.menu li').each(function () {
    const menu = $(this).children('.subInner');
    const link = $(this).children('a');
    if (menu.length && link.length) {
      link.append('<span class="nav__item-btn"></span>');
    }
  });

  $(document).on('click', '.nav__item-btn, .menu__title', function () {
    if ($(window).width() < 1301) {
      $(this).toggleClass('is-open');
      $(this).closest('li').find('.subInner').slideToggle();
    }
  });

  /* ======================================
  tabs
  ====================================== */
  $('.js-tab').on('click', '.tab__txt', function (e) {
    e.preventDefault();
    var tabId = $(this).attr('data-tab');
    $(this).closest('.js-tab').find('.tab__txt').removeClass('is-active');
    $(this).addClass('is-active');
    $('.tab__content').removeClass('is-active');
    $('#' + tabId).addClass('is-active');
  });

  /* ======================================
  FAQ
  ====================================== */
  $('.js-accor').each(function () {
    $('.js-accor-heading', this).on('click', function () {
      $(this).closest('.js-accor').toggleClass('is-open');
      $(this).closest('.js-accor').find('.js-accor-content').slideToggle();
    });
  });
  /* ======================================
   Scroll to top
   ====================================== */
  $(window).scroll(function () {
    var isTop = $('body').hasClass('home_page');
    var threshold = isTop ? 2000 : 300;
    if ($(this).scrollTop() > threshold) {
      $('.js-totop').addClass('is-active');
    } else {
      $('.js-totop').removeClass('is-active');
    }
  });

  $(document).on('click', '.js-totop', function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });
  /* ======================================
  Remove &nbsp header footer
  ====================================== */
  $('.footer, .header').find('*').each(function () {
    $(this).html($(this).html().replace(/&nbsp;/g, ''));
  });

  /* ======================================
  banner sticky
  ====================================== */
  $('.banner__sticky .close').click(function () {
    $(this).parent().fadeOut();
  });
})
  /* ======================================
  mv scroll
  ====================================== */
  (function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  function initMvScrollTrigger() {
    if (!document.querySelector('.mv__space')) return;

    // Kill existing ScrollTrigger instances to avoid duplicates
    ScrollTrigger.getAll().forEach(function (st) {
      if (st.vars.trigger === ".mv__space") {
        st.kill();
      }
    });

    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".mv__space",
        start: "top bottom",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        scrub: 0.5,
        fastScrollEnd: true
      }
    });

    // Animate border pseudo-element via CSS custom property
    var imgwrap = document.querySelector('.mv__imgwwrap');
    if (imgwrap) {
      tl.to(imgwrap, {
        duration: 2,
        '--mv-border-opacity': 0,
        ease: 'none'
      }, "vis1");
    }

    tl.to(".mv__img", {
      duration: 2,
      width: "100%",
      height: "100%",
      borderRadius: "0",
    }, "vis1")
      .to(".mv__img-item", {
        duration: 2,
        scale: 1,
      }, "vis1")
      .to(".mv__img-cover", {
        duration: 1,
        autoAlpha: 1,
      }, "vis2")
      .to(".mv__slidetxt", {
        duration: 1,
        clipPath: "polygon(0 -50%, 100% -50%, 100% 0%, 0 0%)",
        yPercent: 50,
      }, "vis2")
      .to(".newsbox", {
        duration: 1,
        bottom: "auto",
      }, "vis2")
      .to(".mv__scroll", {
        duration: 1,
        bottom: "auto",
      }, "vis2");
  }

  // If page is already fully loaded (cached fast load), run immediately
  if (document.readyState === 'complete') {
    initMvScrollTrigger();
  } else {
    window.addEventListener("load", initMvScrollTrigger);
  }

  // bfcache: when navigating back on mobile, pageshow fires with persisted=true
  window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      initMvScrollTrigger();
    }
  });
})();



$(function () {
  $('a[href*=\\#]:not([href=\\#])').click(function () {
    if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
      var $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      var offsetTop = $(".header__inner").outerHeight() + 50;
      if ($target.length) {
        var targetOffset = $target.offset().top - offsetTop + 1;
        $('html,body').animate({ scrollTop: targetOffset }, 1000);
        return false;
      }
    }
  });
});
// Scroll to anchor if coming from another page
if (location.hash) {
  const hash = location.hash;
  history.replaceState(null, '', location.pathname + location.search);
  window.__pendingHashScroll = hash;
}

$(window).on('load', function () {
  const hash = window.__pendingHashScroll;
  if (hash) {
    const $target = $(hash);
    const offsetTop = $(".header__inner").outerHeight() || 0;

    setTimeout(function () {
      if ($target.length) {
        $('html, body').animate({
          scrollTop: $target.offset().top - offsetTop + 1
        }, 800, function () {
          history.replaceState(null, '', location.pathname + location.search + hash);
        });
      }
    }, 300);
  }
});

