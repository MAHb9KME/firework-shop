// Получаем рандомное число

function getRandom(min, max) {
	var rand = Math.floor(Math.random() * (max - min + 1)) + min;
	return Math.floor(rand / min) * min;
}


// Функция склонения слов после чисел

function declOfNum(number, titles) {
	cases = [2, 0, 1, 1, 1, 2];
	return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}


function tpaneScroll() {
	var $scrollTop = parseInt(jQuery(window).scrollTop()),
		$scrollPane = jQuery('body'),
		h = jQuery('.header-contact').outerHeight(),
		tot_h = jQuery('.header-fix').outerHeight(),
		w = parseInt(jQuery(window).width())

	if ($scrollTop > h) {
		if (!$scrollPane.hasClass('fix')) {
			$scrollPane.addClass('fix')

			if (jQuery(window).width() > 700) {
				jQuery('.main-screen').css("margin-top", tot_h)
			}
		}
	}
	else {
		if (jQuery(window).width() > 700) {
			if ($scrollPane.hasClass('fix')) {
				$scrollPane.removeClass('fix')

				if (jQuery(window).width() > 700) {
					jQuery('.main-screen').css("margin-top", "0")
				}
			}
		}
	}

	if (jQuery(window).width() < 700) {
		jQuery('.main-screen').css("margin-top", tot_h)
	}
}


$(function () {

	// fancybox

	jQuery(".fancybox").fancybox(
		{
			'padding': 20,
			'width': 250,
			'height': "auto",
			'autoDimensions': false,
			'centerOnScroll': 'yes',
			'titleShow': false,
			'touch': false
		})

	jQuery('.gallery-icon a').fancybox(
		{
			'overlayShow': true,
			'hideOnContentClick': true,
			'overlayOpacity': 0.85
		})


	tpaneScroll()
	$(window).resize(function () { tpaneScroll() })
	$(document).scroll(function () { tpaneScroll() })


	// Маска для телефона

	if ($('input.phone').length)
		$('input.phone').inputmask("+7 (999) 999-99-99");

	if ($('input[name=xs_phone]').length)
		$('input[name=xs_phone]').inputmask("+7 (999) 999-99-99");


	// Скролл к элементам с хэшем

	$('.xs_hash').click(function (event) {
		var height = parseInt(Math.round($($(this).attr('href')).offset().top)) - parseInt($('header').height())

		$('html, body').stop().animate({
			scrollTop: height
		}, 500, "linear")

		return false
	})


	// Выдвигаем адаптивное меню

	$('.buttonMenu').click(function () {
		$('body').toggleClass('show_menu')
	})

	$('.menu-container__close').click(function () {
		$('body').removeClass('show_menu')
	})

	/*$(document).click(function(event)
	{
		if (
			$(event.target).closest(".header-menu").length 
		) return;

		$('body').removeClass('show_menu')

		event.stopPropagation();
	})*/


	// Скрытие селектора при клике вне его

	$(document).mouseup(function (e) {
		var div = $(".hide_click_away")

		if (!div.is(e.target) && div.has(e.target).length === 0)
			div.hide();
	})


	// Активируем слайдер

	$('.xs_slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 900,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}]
	});


	// Обратная связь

	$('a[href="#xs_recall"]').click(function () {
		var t = $(this).data('theme'),
			b = $(this).data('button'),
			d = $(this).data("description"),
			y = $(this).data('yandexid'),
			g = $(this).data('googleid')

		$('#xs_recall input[type=submit]').val(b)
		$('#xs_recall input[name=xs_theme]').val(t)
		$("#xs_recall .description").text(d)
		$('#xs_recall .title').text(t)

		if (y !== undefined)
			$('#xs_recall .xs_send_form').data('yandexid', y)
		else
			$('#xs_recall .xs_send_form').data('yandexid', '')

		if (g !== undefined)
			$('#xs_recall .xs_send_form').data('googleid', g)
		else
			$('#xs_recall .xs_send_form').data('googleid', '')

		$('.xs_result').text('');
	})

	if ($('input[name=xs_link]').length > 0)
		$('input[name=xs_link]').val(window.location.href)

	$('.xs_send_form').on('submit', function (e) {
		e.preventDefault()

		var f = $(this),
			yandexid = f.data('yandexid'),
			googleid = $(this).data('googleid')

		f.addClass('xs_load')

		$.ajax({
			url: '/wp-content/themes/xs_business/load/mail.php',
			method: 'post',
			data: f.serialize(),
			success: function (data) {
				if (data != 'error') {
					//if(yandexid !== undefined && yandexid != '')
					//	yaCounter50465191.reachGoal(yandexid)

					//if(googleid !== undefined && googleid != '')
					//	ga('send', 'event', googleid);

					f.find('input[type=text],textarea,input[type=url],input[type=number],select,input[type=email],input[type=date],input[type=tel]').val('')
					f.find('.xs_result').html(data)
				}
				else
					alert('Ошибка при отправке данных. Пожалуйста заполните обязательное поле "Телефон"')


				f.removeClass('xs_load')
			}
		})
	})


	// разворот дочерних пунктов меню

	if ($(document).width() <= 960) {
		$('header nav ul li.menu-item-has-children > a').click(function () {


			$(this).toggleClass('rotate');

			var menu = $(this).next();
			if ($(menu).is(':visible')) {
				$(menu).slideUp(400);
			}
			else {
				$(menu).slideDown(400);
			}

			return false;

		});
	}


	// Прикрепление фото к форме
	$(document).on('change', '.work__upload-input', function () {
		if (jQuery(this).val() != '') {
			jQuery(this).parents('.work__upload').find('.work__upload-text').html('Фото прикреплено')
		}
		else {
			jQuery(this).next('.attache').removeClass('hover').text('Прикрепите фото персонажа')
		}
	})



	// Проверяем, можно ли использовать Webp формат
	function canUseWebp() {
		// Создаем элемент canvas
		let elem = document.createElement('canvas');
		// Приводим элемент к булеву типу
		if (!!(elem.getContext && elem.getContext('2d'))) {
			// Создаем изображение в формате webp, возвращаем индекс искомого элемента и сразу же проверяем его
			return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
		}
		// Иначе Webp не используем
		return false;
	}

	window.onload = function () {
		// Получаем все элементы с дата-атрибутом data-bg
		let images = document.querySelectorAll('[data-bg]');
		// Проходимся по каждому
		for (let i = 0; i < images.length; i++) {
			// Получаем значение каждого дата-атрибута
			let image = images[i].getAttribute('data-bg');
			// Каждому найденному элементу задаем свойство background-image с изображение формата jpg
			images[i].style.backgroundImage = 'url(' + image + ')';
		}

		// Проверяем, является ли браузер посетителя сайта Firefox и получаем его версию
		let isitFirefox = window.navigator.userAgent.match(/Firefox\/([0-9]+)\./);
		let firefoxVer = isitFirefox ? parseInt(isitFirefox[1]) : 0;

		// Если есть поддержка Webp или браузер Firefox версии больше или равно 65
		if (canUseWebp() || firefoxVer >= 65) {
			// Делаем все то же самое что и для jpg, но уже для изображений формата Webp
			let imagesWebp = document.querySelectorAll('[data-bg-webp]');
			for (let i = 0; i < imagesWebp.length; i++) {
				let imageWebp = imagesWebp[i].getAttribute('data-bg-webp');
				imagesWebp[i].style.backgroundImage = 'url(' + imageWebp + ')';
			}
		}
	};






	// Поиск автозаполнение очистка
	$(document).on('click', '.search__plug-text, .search__main', function () {
		$('.search__plug').addClass('hide')
		$('.search__main').drug-focus()
	})

	$(document).click(function (event) {
		if ($('.search__main').val() == "") {
			if
				(
				$(event.target).closest(".search__main").length ||
				$(event.target).closest(".search").length
			)
				return;

			$('.search__plug').removeClass('hide')
			event.stopPropagation();
		}
	})

	// Поиск автозаполение внесение данных
	$(document).on('click', '.search__plug-link', function () {
		$('.search__plug').addClass('hide')
		text = $(this).text()
		$('.search__main').val(text)
		$('.search__main').drug-focus()
	})


	// Common scroll

	// functions for action
	$('.scroll').each(function () {
		scroll_line($(this))
	})

	$('.scroll__container').scroll(function () {
		scroll_line($(this).parents('.scroll'))
	})

	// moving
	function scroll_line(c) {
		var s = c.find('.scroll__container')
		a_l = '<div class="scroll__left"></div>',
			a_r = '<div class="scroll__right"></div>'

		if (parseInt(s.width()) >= parseInt(s[0].scrollWidth)) {
			c.find('.scroll__left, .arrow_scroll__right').remove()

			return false;
		}

		var s_l = s.scrollLeft()

		if (s_l > 0) {
			if (c.find('.scroll__left').length == 0)
				c.prepend(a_l)
		}
		else
			c.find('.scroll__left').remove()

		if (parseInt(s[0].scrollWidth) - s_l > parseInt(s.width())) {
			if (c.find('.scroll__right').length == 0)
				c.append(a_r)
		}
		else
			c.find('.scroll__right').remove()
	}

	// click on arrows
	$(document).on('click', '.scroll__right, .scroll__left', function () {

		var c = $(this).parents('.scroll'),
			s = c.find('.scroll__container'),
			st = c.data('step') == undefined
				? 100
				: parseInt(c.data('step')),
			s_l = $(this).hasClass('scroll__right')
				? s.scrollLeft() + st
				: s.scrollLeft() - st

		s.stop().animate({
			scrollLeft: s_l
		}, 100)
	})



	// Слайдер на главном экране
	$('.slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		fade: true,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true
				}
			}]
	});

	$(document).on('click', '.slider-arrow--left', function () {
		$('.slider').slick('slickPrev')
	})

	$(document).on('click', '.slider-arrow--right', function () {
		$('.slider').slick('slickNext')
	})


	// Слайдер товаров недели
	$('.week .week__slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		arrows: true,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		prevArrow: '<div class="navigate__item"><div class="navigate__arrow"></div><div class="navigate__text">предыдущий</div></div>',
		nextArrow: '<div class="navigate__item"><div class="navigate__text">следующий</div><div class="navigate__arrow"></div></div>',
		appendArrows: $('.navigate'),
		responsive: [
			{
				breakpoint: 993,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
				}
			},
			{
				breakpoint: 755,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					draggble: true,
					swipe: true,
					prevArrow: '<button type="button" class="slick-prev">Previous</button>',
					nextArrow: '<button type="button" class="slick-next">Next</button>',
					appendArrows: $('.week .week__slider'),
				}
			}]
	});


	// Слайдер на главном экране
	$('.edge__list').slick({
		slidesToShow: 11,
		slidesToScroll: 2,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 9,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 1150,
				settings: {
					slidesToShow: 8,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 6,
					slidesToScroll: 2
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					arrows: true
				}
			},
			{
				breakpoint: 479,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					arrows: true
				}
			}]
	});

	$(document).on('click', '.edge-arrow--left', function () {
		$('.edge__list').slick('slickPrev')
	})

	$(document).on('click', '.edge-arrow--right', function () {
		$('.edge__list').slick('slickNext')
	})


	// Запрет ввода букв в фильтр
	$(document).on('keypress', '.filter__input', function (e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57))
			return false
	})

	// Выпадающий список
	$(document).on('click', '.droplist__focus', function () {
		parent = $(this).parents('.droplist')
		menu = parent.find('.droplist__box')

		if (parent.hasClass('droplist--active')) {
			parent.removeClass('droplist--active')
		}
		else {
			$('.droplist').removeClass('droplist--active')
			parent.addClass('droplist--active')
		}
	})

	$(document).on('click', '.droplist__item', function () {
		text = $(this).text()
		$(this).parents('.droplist').find('.droplist-name').val(text)

		$('.droplist').removeClass('droplist--active')
	})

	$(document).on('click', '.reset-label', function () {
		$('.droplist').removeClass('droplist--active')
	})

	$(document).click(function (e) {
		var div = $(".droplist"); // тут указываем class элемента
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			div.removeClass('droplist--active')
		}
	});

	// Слайдер в адаптиве для производителей
	$('.makers__body--slider').slick({
		responsive: [
			{
				breakpoint: 8192,
				settings: "unslick"
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true
				}
			}]
	});

	// Слайдер отзывы
	$('.reviews__body').slick({
		slidesToShow: 4,
		slidesToScroll: 1,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					draggble: true
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					draggble: true
				}
			},
			{
				breakpoint: 578,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					draggble: true,
					arrows: true
				}
			}]
	});

	$(document).on('click', '.reviews-arrow--left', function () {
		$('.reviews__body').slick('slickPrev')
	})

	$(document).on('click', '.reviews-arrow--right', function () {
		$('.reviews__body').slick('slickNext')
	})


	// Слайдер сертификаты
	$('.certificates__body').slick({
		slidesToShow: 6,
		slidesToScroll: 2,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 1150,
				settings: {
					slidesToShow: 5,
					slidesToScroll: 5
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 4,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
				}
			},
			{
				breakpoint: 700,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					arrows: true
				}
			}]
	});

	$(document).on('click', '.certificates--prev', function () {
		$('.certificates__body').slick('slickPrev')
	})

	$(document).on('click', '.certificates--next', function () {
		$('.certificates__body').slick('slickNext')
	})


	// Подмена placeholder в поиске хедер
	if ($(document).width() <= 576) {
		$('.search__main').attr("placeholder", "Поиск");
	}

	// Футер раскрытие меню
	$(document).on('click', '.footer__nav-pointer', function () {

		var parent = $(this).parents('.footer__nav-item');
		var menu = parent.find('.footer__ul')


		$('.footer__nav-pointer').removeClass('active')

		if ($(menu).is(':visible')) {
			$(menu).slideUp(400)
			$(parent).removeClass('active')
		}
		else {
			$('.faq-content .line .answer').slideUp(400)
			$(menu).slideDown(400)
			$(parent).addClass('active')
		}

	})

	// Слайдер для больших блоков преимуществ 
	$('.pros__inner').slick({
		responsive: [
			{
				breakpoint: 8192,
				settings: "unslick"
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true,
					adaptiveHeight: true
				}
			}]
	});

	// Раскрытие фильтра в адаптиве
	if ($(document).width() <= 750) {
		$(document).on('click', '.filter-mobilebtn', function () {
			parent = $(this).parents('.filter__form')
			menu = parent.find('.filter-type')

			if ($(menu).is(':visible')) {
				$(menu).slideUp(200)
				$(parent).removeClass('filter__form--active')
			}
			else {
				$('.faq-content .line .answer').slideUp(200)
				$(menu).slideDown(200)
				$(parent).addClass('filter__form--active')
			}
		})

		$(document).on('click', '.filter__item', function () {
			parent = $(this).parents('.filter__form')
			menu = parent.find('.filter-type')
			text = $(this).find('input').val()
			parent.find('.filter-mobilebtn span').text(text)

			$(menu).slideUp(200)
			$(parent).addClass('filter__form--active')
		})
	}

	// Слайдер для блока Предложений
	$('.offers__body').slick({
		responsive: [
			{
				breakpoint: 8192,
				settings: "unslick"
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true
				}
			}]
	});


	// Слайдер для блока Вы смотрели
	$('.watched__body').slick({
		slidesToShow: 5,
		slidesToScroll: 2,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 1400,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
					draggble: true,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					draggble: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					draggble: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					touchMove: true,
					swipeToSlide: true,
					touchThreshold: true,
					swipe: true,
					arrows: true
				}
			}]
	});

	$(document).on('click', '.watched--prev', function () {
		$('.watched__body').slick('slickPrev')
	})

	$(document).on('click', '.watched--next', function () {
		$('.watched__body').slick('slickNext')
	})

	// Слайдер для блока Вы смотрели
	$('.tab-body__content').slick({
		responsive: [
			{
				breakpoint: 8192,
				settings: "unslick"
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true,
					arrows: true
				}
			}]
	});

	// Выпадающий список в адаптиве
	if ($(document).width() <= 767) {
		$(document).on('click', '.tab-panel__btn', function () {
			parent = $(this).parents('.tab-panel')
			menu = parent.find('.tab-panel__wrapper')

			if ($(menu).is(':visible')) {
				$(menu).slideUp(200)
				$(parent).removeClass('tab-panel--active')
			}
			else {
				$(menu).slideDown(200)
				$(parent).addClass('tab-panel--active')
			}
		})

		$(document).on('click', '.tab-panel__item', function () {
			parent = $(this).parents('.tab-panel')
			menu = parent.find('.tab-panel__wrapper')
			text = $(this).text()
			parent.find('.tab-panel__btn span').text(text)

			$(menu).slideUp(200)
			$(parent).removeClass('tab-panel--active')
		})
	}

	// Поиск в адаптиве
	if ($(document).width() >= 993 && $(document).width() <= 1250) {
		$(document).on('click', '.search__trigger', function () {
			parent = $(this).parents('.header-main__inner')

			$(parent).addClass('header-main__inner--active')
		})

		$(document).click(function (e) {
			var div = $(".search--header");
			if (!div.is(e.target) && div.has(e.target).length === 0) {
				$('.header-main__inner').removeClass('header-main__inner--active')
			}
		});
	}

	// Триггер виджета
	$(document).on('click', '.widget__trigger', function () {
		if ($('.widget').hasClass('widget--active')) {
			$('.widget').removeClass('widget--active')
		}
		else {
			$('.widget').addClass('widget--active')
		}
	})

	// Слайдер Не стоит пропускать
	$('.news-box').slick({
		slidesToShow: 4,
		slidesToScroll: 2,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					draggble: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					draggble: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true,
					adaptiveHeight: true
				}
			}]
	});

	$(document).on('click', '.news-box__arrow--left', function () {
		$('.news-box').slick('slickPrev')
	})

	$(document).on('click', '.news-box__arrow--right', function () {
		$('.news-box').slick('slickNext')
	})

	// Счетчик кол-ва в товарах
	function set_quantity(e) {
		var c = e.data('nav'),
			parent = e.parents('.amt-box')
		input = parent.find('.amt-box__input'),
			start_price = parent.find('.amt-box__price').data('start'),
			total_field = parent.find('.amt-box__price span'),
			total_input = parent.find('.amt-box__total'),
			focus = parent.find('.amt-box__focus'),
			limit = parseInt(parent.find('.amt-box__to').text()),
			v = parseInt(input.val())

		if (c == 'plus' && input.val() < limit) {
			v++
		}
		else if (c == 'minus') {
			v--
			if (v <= 0)
				v = 1;
		}

		if (v == NaN)
			v = 1

		input.val(v)
		focus.text(v)

		var result = input.val() * start_price;

		total_input.val(result)
		total_field.text(result)
	}


	// вызов функции
	$(document).on('click', '.amt-box__btn', function () {
		set_quantity($(this))

		return false;
	})

	// Запрет ввода букв
	$(document).on('keypress', '.amt-box__input', function (e) {
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57))
			return false
	})

	// Разворот карточки front and back side
	$(document).on('click', '.product__prices-show', function () {
		let parent = $(this).parents('.product__inn')

		if (parent.hasClass('product__inn--active')) {
			parent.removeClass('product__inn--active')
		}
		else {
			$('.product__inn').removeClass('product__inn--active')
			parent.addClass('product__inn--active')
		}

	})

	// Разворот карточки front and back side
	$(document).on('click', '.back-product__return', function () {
		let parent = $(this).parents('.product__inn')

		if (parent.hasClass('product__inn--active')) {
			parent.removeClass('product__inn--active')
		}
		else {
			$('.product__inn').removeClass('product__inn--active')
			parent.addClass('product__inn--active')
		}
	})


	// Разворот производителей front and back side
	$(document).on('click', '.makers__btn', function () {
		let parent = $(this).parents('.makers__item')

		if (parent.hasClass('makers__item--active')) {
			parent.removeClass('makers__item--active')
		}
		else {
			$('.makers__item').removeClass('makers__item--active')
			parent.addClass('makers__item--active')
		}
	})

	// Разворот производителей front and back side
	$(document).on('click', '.back-makers__return', function () {
		let parent = $(this).parents('.makers__item')

		if (parent.hasClass('makers__item--active')) {
			parent.removeClass('makers__item--active')
		}
		else {
			$('.makers__item').removeClass('makers__item--active')
			parent.addClass('makers__item--active')
		}
	})

	// 
	$(document).on('click', '.dropdown__current', function () {
		let parent = $(this).parents('.dropdown')

		if (parent.hasClass('dropdown--active')) {
			$('body').removeClass('popup')
			parent.removeClass('dropdown--active')
		}
		else {
			$('.dropdown').removeClass('dropdown--active')
			$('body').addClass('popup')
			parent.addClass('dropdown--active')
		}
	})

	$(document).click(function (event) {
		if ($(event.target).closest(".dropdown__list ").length || $(event.target).closest(".dropdown").length) return;
		event.stopPropagation();

		$('body').removeClass('popup')
		$('.dropdown').removeClass('dropdown--active')
	})

	// Разворот подменю в выпадающем списке
	$(document).on('click', '.drop-customers__arrow', function () {

		var parent = $(this).parents('.drop-customers__li');
		var menu = parent.find('.drop-customers__sub-ul')

		if ($(menu).is(':visible')) {
			$(menu).slideUp(400)
			$(parent).removeClass('drop-customers__li--active')
		}
		else {
			$(menu).slideDown(400)
			$(parent).addClass('drop-customers__li--active')
		}

	})


	// Выпадающий список в форме
	$(document).on('click', '.drop-list__head', function () {

		var parent = $(this).parents('.drop-list__item');
		var menu = $(this).next();

		$('.drop-list__item').removeClass('drop-list__item--active')

		if( $(menu).is(':visible')) {
			$(menu).slideUp(400)
			$(parent).removeClass('drop-list__item--active')
		}
		else {
			$('.drop-list__body').slideUp(400)
			$(menu).slideDown(400)
			$(parent).addClass('drop-list__item--active')
		}
	})

	// Табы в форме Входа и Регистрации
	$(document).on('click', '.tabs-form__btn', function () {

        $('.tabs-form__btn').removeClass('tabs-form__btn--active');
        $(this).addClass('tabs-form__btn--active');

        let get_data = $(this).data('click'),
        	parent = $(this).parents('.tabs-form')

     	parent.find('.form-popup__tab').removeClass('form-popup__tab--active');

        parent.find('.form-popup__tab[data-click="'+get_data+'"]').addClass('form-popup__tab--active')
    });

    // Раскрытие основного выпадающего меню
    $(document).on('click', '.header__panel-btn', function () {

        let parent = $('body')

		if (parent.hasClass('main-menu-drop')) {
			parent.removeClass('main-menu-drop')
		}
		else {
			parent.addClass('main-menu-drop')
		}
    });

	// Клик все поля фильтра
	$(document).click(function (e) {
	    var div = $(".header__panel-btn");
	    var div_2 = $(".header-menu");
	    var div_3 = $(".search--header");

		if
		(
			!div.is(e.target) && div.has(e.target).length === 0 && 
			!div_2.is(e.target) && div_2.has(e.target).length === 0 &&
			!div_3.is(e.target) && div_3.has(e.target).length === 0
		) 
		{
			$('body').removeClass('main-menu-drop')
		}
	});

	// Слайдер изображений в карточке товара
	$('.p-slider__max').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
      	asNavFor: '.p-slider__min',
		responsive: [
		{
			breakpoint: 992,
			settings: {
				draggble: true,
				touchMove: true,
				swipeToSlide: true,
				touchThreshold: true,
				swipe: true,
				arrows: true
			}
		}]
	});

	$('.p-slider__min').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		infinite: false,
		touchMove: false,
		swipeToSlide: false,
		touchThreshold: false,
		swipe: false,
		arrows: false,
      	asNavFor: '.p-slider__max',
	    focusOnSelect: true
	});

	// Разворот в карточке товара front and back side
	$(document).on('click', '.wholesale-btn', function () {
		let parent = $(this).parents('.flip-body')

		if (parent.hasClass('flip-body--active')) {
			parent.removeClass('flip-body--active')
		}
		else {
			$('.flip-body').removeClass('flip-body--active')
			parent.addClass('flip-body--active')
		}
	})

	// Слайдер производителей в верхнем меню
	/*$('.drug-focus-menu__labels').slick({
		slidesToShow: 8,
		slidesToScroll: 2,
		responsive: [
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 2,
					draggble: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					draggble: true,
					adaptiveHeight: true
				}
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					draggble: true,
					arrows: true,
					adaptiveHeight: true
				}
			}]
	});*/


	// Каталог фильтр по популярности и цене
    $(document).on('click', '.selc-dropdown__name', function()
	{
		if( $('.selc-dropdown').hasClass('selc-dropdown--active') )
			$('.selc-dropdown').removeClass('selc-dropdown--active')
		else
			$('.selc-dropdown').addClass('selc-dropdown--active')
	})

	$(document).on('click', '.selc-dropdown__li', function()
	{
		$('.selc-dropdown').removeClass('selc-dropdown--active')

		product = $(this).text()
		$(this).parents('.selc-dropdown').find('.selc-dropdown__name').text(product)
	})

	$(document).click(function(event)
	{
		if ($(event.target).closest(".selc-dropdown__name").length || $(event.target).closest(".selc-dropdown__li").length ) return;
		event.stopPropagation();

		$('.selc-dropdown').removeClass('selc-dropdown--active')
	})

	// Сортировка по, страница каталога
	if ($(document).width() <= 992)
	{
	    $(document).on('click', '.dropdown-panel__name', function()
		{
			if( $('.dropdown-panel').hasClass('dropdown-panel--active') )
				$('.dropdown-panel').removeClass('dropdown-panel--active')
			else
				$('.dropdown-panel').addClass('dropdown-panel--active')
		})

		$(document).on('click', '.dropdown-panel__li', function()
		{
			$('.dropdown-panel').removeClass('dropdown-panel--active')

			product = $(this).text()
			$(this).parents('.dropdown-panel').find('.dropdown-panel__name').text(product)
		})

		$(document).click(function(event)
		{
			if ($(event.target).closest(".dropdown-panel__name").length || $(event.target).closest(".dropdown-panel__li").length ) return;
			event.stopPropagation();

			$('.dropdown-panel').removeClass('dropdown-panel--active')
		})
	}

	// Раскрытие списка ссылок - каталог
    $(document).on('click', '.overflow-box__more', function () {

        let parent = $(this).parents('.overflow-box')

		if (parent.hasClass('overflow-box--active')) {
			parent.removeClass('overflow-box--active')
			$(this).text('Показать еще')
		}
		else {
			parent.addClass('overflow-box--active')
			$(this).text('Скрыть')
		}
    });



    // Get all elements with the .drug-focus class
	const focusElems = document.querySelectorAll('.drug-focus');

	// Define variables to keep track of touch position and direction
	let touchStartX = null;
	let touchEndX = null;

	// Add touchstart, touchmove, and touchend event listeners to each .drug-focus element
	focusElems.forEach(focusElem => {
	  focusElem.addEventListener('touchstart', e => {
	    // Store the starting touch position
	    touchStartX = e.touches[0].clientX;
	  });
	  
	  focusElem.addEventListener('touchmove', e => {
	    // Store the current touch position
	    touchEndX = e.touches[0].clientX;
	    
	    // Calculate the distance traveled
	    const distX = touchEndX - touchStartX;
	    
	    // Add the appropriate class depending on the direction of the movement
	    if (Math.abs(distX) > 40) {
	      if (distX > 0) {
	        focusElem.setAttribute('data-direction', 'right');
	      } else {
	        focusElem.setAttribute('data-direction', 'left');
	      }
	    }
	  });
	  
	  focusElem.addEventListener('touchend', e => {
	    
	    // Reset touch position variables
	    touchStartX = null;
	    touchEndX = null;
	  });
	});

})

