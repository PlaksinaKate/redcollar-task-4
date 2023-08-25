$('document').ready(function () {
  $('.header__burger').on('click', function () {
    $(this).toggleClass('active');
    $('.header__mobmenu').slideToggle();
  });

  $('.header__mobmenu-parent').on('click', function () {
    $(this).toggleClass('opened');
    $(this).find('.header__mobmenu-childs').slideToggle();
  });

  $('.header__search-btn').on('click', function () {
    $(this).hide();
    $('.header__search-btn-close').addClass('show');
    $('.header__search-input').show();
    $('.header__menu').addClass('hidden');
    $('.header__logo').addClass('hidden');
    $('.header__langs').hide();
  });

  $('.header__search-btn-close').on('click', function () {
    $('.header__search-btn').show();
    $(this).removeClass('show');
    $('.header__search-input').hide();
    $('.header__menu').removeClass('hidden');
    $('.header__logo').removeClass('hidden');
    $('.header__langs').show();
  });

  const swiperProduct1 = new Swiper('.product__head-photos-silder', {
    speed: 500,
    spaceBetween: 20,
    slidesPerView: 1,

    mousewheel: {
      releaseOnEdges: true,
      forceToAxis: true
    },

    navigation: {                       //navigation(arrows)
      nextEl: ".product__head-photos-silder-btn_prev",
      prevEl: ".product__head-photos-silder-btn_next",
    }

  })

  const swiperProduct2 = new Swiper('.product__head-photos-pagination-slider', {
    speed: 500,
    spaceBetween: 0,
    slidesPerView: 3,
    direction: 'vertical',
    slideToClickedSlide: true,
    centeredSlides: true,

    breakpoints: {
      1280: {
        direction: 'vertical',
      },

      0: {
        direction: 'horizontal',
      },
    },


    navigation: {                       //navigation(arrows)
      nextEl: ".product__head-photos-silder-btn_next",
      prevEl: ".product__head-photos-silder-btn_prev",
    }
  })

  swiperProduct1.controller.control = swiperProduct2;
  swiperProduct2.controller.control = swiperProduct1;

  const swiperOurHistory = new Swiper('.our-history__content-slider', {
    speed: 500,
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,

    mousewheel: {
      releaseOnEdges: true,
      forceToAxis: true
    },

    navigation: {
      nextEl: ".our-history__content-slider-navigation_next",
      prevEl: ".our-history__content-slider-navigation_prev",
    }
  })



  const galleryItems = Array.from(document.getElementsByClassName('press-sluzhba-gallery__content-item'))
  const galleryPopup = document.getElementsByClassName('press-sluzhba-gallery__popup')[0]
  const galleryPopupCross = document.getElementsByClassName('press-sluzhba-gallery__popup-cross')[0]

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', function () {
      galleryPopup.classList.remove('hidden')

      const swiperGalleryPopup = new Swiper('.press-sluzhba-gallery__popup-slider', {
        speed: 500,
        spaceBetween: 10,
        slidesPerView: 1,
        loop: true,
        initialSlide: index,

        mousewheel: {
          releaseOnEdges: true,
          forceToAxis: true
        },
    
        navigation: {
          nextEl: ".press-sluzhba-gallery__popup-navigation_next",
          prevEl: ".press-sluzhba-gallery__popup-navigation_prev",
        }
      })
    })
  })

  galleryPopupCross.addEventListener('click', function () {
    galleryPopup.classList.add('hidden')
  })

  const ourHistorySlides = document.querySelectorAll('.our-history__content-slider .swiper-slide')
  const ourHistorySlidesPopup = Array.from(document.getElementsByClassName('our-history__popup'))
  const ourHistorySlidesPopupCross = Array.from(document.querySelectorAll('[data-popupcross]'))

  ourHistorySlides.forEach(slide => {
    slide.addEventListener('click', function () {
      const slideId = slide.getAttribute('id')
      const popupFiltered = ourHistorySlidesPopup.filter(popup => popup.getAttribute('data-popup').split('-')[1] === slideId)

      popupFiltered[0].classList.remove('hidden')
    })
  })

  ourHistorySlidesPopup.forEach(popup => {
    const popupCross = ourHistorySlidesPopupCross.filter(item => item.getAttribute('data-popupcross') === popup.getAttribute('data-popup'))
    popupCross[0].addEventListener('click', function () {
      popup.classList.add('hidden')
    })
  })

  const pressSluzhbaFiltes = Array.from(document.getElementsByClassName('press-sluzhba__header-filter'))
  const pressSluzhbaContent = Array.from(document.getElementsByClassName('press-sluzhba__content'))

  pressSluzhbaFiltes.forEach(filter => {
    filter.addEventListener('click', function () {
      const content = pressSluzhbaContent.filter(content => filter.getAttribute('data-filter') === content.getAttribute('data-content'))
      const contentActive = pressSluzhbaContent.filter(item => item.classList.contains('press-sluzhba__content_active'))
      const filterActive = pressSluzhbaFiltes.filter(item => item.classList.contains('press-sluzhba__header-filter_active'))

      contentActive[0].classList.remove('press-sluzhba__content_active')
      filterActive[0].classList.remove('press-sluzhba__header-filter_active')

      content[0].classList.add('press-sluzhba__content_active')
      filter.classList.add('press-sluzhba__header-filter_active')
    })
  })
});