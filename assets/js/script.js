let _onePageScroll = (function()  {
	let container	= $('.main'),
		points		= $('.points__link'),
		sections	= $('.section'),
		screen		= 0,
		inScroll	= false,
		posY1		= 0,
		posY2		= 0;
	
	var startPoint = {};
	var nowPoint;
	var ldelay;

	$('.section:first-child').addClass('section--active');
	$('.points__item:first-child .points__link').addClass('points__link--active');

	let _activePoints = function(active) {
		points.removeClass('points__link--active');
		points.filter("[href='" + active + "']").addClass('points__link--active');
	}

	let _moveTo = function() {
		let pos		= (-screen * 100) + '%';

		sections.eq(screen).addClass('section--active').siblings().removeClass('section--active');
		container.css('top', pos);

		_activePoints("#section-" + (screen + 1));
	}

	let _scroll = function(e) {
		let activePage = sections.filter('.section--active');

		if(!inScroll) {
			inScroll = true;

			if (e.deltaY > 0) {
				if(activePage.prev().length) {
					screen--;
				}
			} else {
				if(activePage.next().length) {
					screen++;
				}
			}
		}

		_moveTo();

		setTimeout(function() {
			inScroll = false;
		}, 1300);
	};

	let _scrollClick = function(e) {
		let tar = $(e.target);
		screen = parseInt(tar.attr('data-section'));

		_moveTo();
	}

	let _touchSwipe = function(direction) {
		let activePage = sections.filter('.section--active');
		
		if(!inScroll) {
			inScroll = true;

			if (direction === "down" && activePage.prev().length) {
				screen--;
			} 
			if (direction === "up" && activePage.next().length) {
				screen++;
			}
		}

		_moveTo();

		setTimeout(function() {
			inScroll = false;
		}, 1300);
	}
	
	return {
		init: function() {
			if (document.body.clientWidth <= '768') {
				$(window).swipe({
					swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
						_touchSwipe(direction);
					}
				});
			}

			$('body').on('mousewheel', function(e) {
				_scroll(e);
			});

			$('.nav__link, .points__link, .btn--order, #about').on('click', function(e) {
				e.preventDefault();
				_scrollClick(e);
			});
		}
	}
}());

let _accordClick = (function() {
	let _showTeam = function(e) {
		e.preventDefault();
		let tar = $(e.target),
			item = tar.closest('.team__item'),
			items = item.siblings(),
			content = item.find('.team__desc'),
			contentHeight = content.outerHeight(true);

		if(!item.hasClass('team__item--active')) {
			item.addClass('team__item--active').find('.team__inner').css('height', contentHeight);
			items.removeClass('team__item--active').find('.team__inner').css('height', 0);
		} else {
			item.removeClass('team__item--active').find('.team__inner').css('height', 0);
		}
	}

	let _showMenu = function(e) {
		e.preventDefault();
		let tar = $(e.target),
			item = tar.closest('.menu__item'),
			items = item.siblings(),
			content = item.find('.team__text'),
			contentWidth = ($(window).width() <= 768) ? $(window).width() - item.find('.menu__link').width() * (items.length + 1) : $(window).width() * 0.5;

		if(!item.hasClass('menu__item--active')) {
			item.addClass('menu__item--active').find('.menu__desc').css('width', contentWidth);
			items.removeClass('menu__item--active').find('.menu__desc').css('width', 0);
		} else {
			item.removeClass('menu__item--active').find('.menu__desc').css('width', 0);
		}
	};

	return {
		init: function() {
			$('.team__link').click(function(e) {
				_showTeam(e);
			});

			$('.menu__link').click(function(e) {
				_showMenu(e);
			});
		}
	}
}());

let _clickElement = (function()  {
	let _showMenu = function(e) {
		let tar = $(e.target);
		
		tar.toggleClass('btn-menu--open');
		$('.nav').toggleClass('nav--active');
	}

	let _showStructure = function(e) {
		let tar = $(e.target),
			slider = tar.closest('.slider'),
			structure = slider.find('.structure');

		if(tar.hasClass('structure-close')) {
			structure.toggleClass('structure--active');
		}
	}

	return {
		init: function() {
			$('#gamburger').click(function(e) {
				_showMenu(e);
			});

			$('.structure-close').on('click', function(e) {
				e.stopPropagation()
				e.preventDefault();
				
				if ($(window).width() <= 768) {
					_showStructure(e);
				};
			});
		}
	}
}());

let _carousel = (function()  {
	let container = $('.carousel__list'),
		slides = $('.carousel__item'),
		slide = 0,
		inScroll = false;

	$('.carousel__item:first-child').addClass('carousel__item--active');

	let _moveTo = function() {
		let pos		= (-slide * 100) + '%';
		
		slides.eq(slide).addClass('carousel__item--active').siblings().removeClass('carousel__item--active');
		container.css('left', pos);
	}
	
	let _slide = function(e) {
		let tar = $(e.target);
		let direct = tar.attr('data-contrl');

		let activeSlide = slides.filter('.carousel__item--active');
		
		if(!inScroll) {
			inScroll = true;

			if (direct < 0) {
				if(activeSlide.prev().length) {
					slide--;
				} else {
					slide = slides.length - 1;
				}
			} else {
				if(activeSlide.next().length) {
					slide++;
				} else {
					slide = 0;
				}
			}
		}

		_moveTo();

		setTimeout(function() {
			inScroll = false;
		}, 1300);
	}

	return {
		init: function() {
			$('.carousel__controls').click(function(e) {
				e.preventDefault();
				_slide(e);
			});
		}
	}
}());

let _reviewsPopup = (function()  {

	let _popupShow = function(e) {
		let tar = $(e.target);
		
		tar.closest('section').find('.popup').addClass('popup--show');
	}

	let _popupClose = function(e) {
		let tar = $(e.target);

		if(tar.hasClass('popup-close')) {
			tar.closest('section').find('.popup').removeClass('popup--show');
		}
	}

	return {
		init: function() {
			$('.reviews__btn').click(function(e) {
				e.preventDefault();
				_popupShow(e);
			});

			$('.popup__close-icon, .popup').click(function(e) {
				e.preventDefault();
				_popupClose(e);
			});
		}
	}
}());

let _submitForm = (function()  {

	let _createQtip = function(element) {
		let qtip 		= document.createElement('div'),
			qtipCont	= document.createElement('div'),
			posLeft 	= $(element).outerWidth(true) / 2,
			label 		= element.closest('label');
		
		qtip.classList.add('qtip');
		qtipCont.classList.add('qtip__content');
		qtipCont.innerHTML = 'Заполните поле!';
		qtip.appendChild(qtipCont);
		qtip.style.left = posLeft + 'px';

		label.appendChild(qtip);
	};

	let _validateForm = function(form) {
		let inputs = form.find('input[data-required]'),
			valid = true;
		
		$.each(inputs, function(index, v) {
			let input = $(v),
				val = input.val();

			if(val.length === 0) {
				input.addClass('form__label-input--error');
				_createQtip(input[0]);
				valid = false;
			}
		});

		return valid;
	};

	let _removeError = function(e) {
		let tar = $(e.target);

		tar.closest('label').find('.qtip').remove();
		tar.removeClass('form__label-input--error');
	};

	let _clearForm = function(e) {
		let form = $(e.target);

		form.find('.qtip').remove();
		form.find('.form__label-input--error').removeClass('form__label-input--error');
	};

	let _ajaxForm = function(form, url) {
		if (!_validateForm(form)) return false;

		let data = form.serialize();

		var result = $.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: data,
		}).fail(function(ans) {
			let popup = form.closest('section').find('.popup');

			popup.addClass('popup--show')
				.find('.popup__block')
				.addClass('popup__block--error')
				.find('.popup__text')
				.text('Не удалось отправить заявку!');
		});

		return result;
	}

	let _addRequest = function(e) {
		e.preventDefault();

		let form = $(e.target),
			url = 'add_request.php',
			serverAnswer = _ajaxForm(form, url);
		
		if(serverAnswer) {
			serverAnswer.done(function(ans) {
				let popup = form.closest('section').find('.popup');

				if(ans.status === 'OK') {
					popup.addClass('popup--show')
						.find('.popup__block')
						.removeClass('popup__block--error')
						.find('.popup__text')
						.text(ans.text);
				}else {
					popup.addClass('popup--show')
						.find('.popup__block')
						.addClass('popup__block--error')
						.find('.popup__text')
						.text(ans.text);
				}
			});
		}
	}

	return {
		init: function() {
			$('#add_request').on('submit', _addRequest); // Добавить проект

			$('form').on('click', '.form__label-input--error', _removeError);
			$('form').on('reset', _clearForm);
		}
	}
}());

let _yandexMap = (function()  {

	let _map = function() {

		let myMap  = new ymaps.Map("map", {
			center: [59.94463639, 30.31112969], 
			zoom: 12
		});

		let marks = new ymaps.GeoObjectCollection({}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/map-marker.svg',
			iconImageSize: [46, 57.727],
			iconImageOffset: [-22, -57]
		});

		let mark1 = new ymaps.Placemark([59.932197, 30.321123], {
			hintContent: 'Mr. Burger',
			balloonContent: 'Казанская улица, 7'
		});

		let mark2 = new ymaps.Placemark([59.93497218, 30.27689658], {
			hintContent: 'Mr. Burger',
			balloonContent: '13-я линия Васильевского острова, 6-8'
		});

		let mark3 = new ymaps.Placemark([59.959872, 30.327170], {
			hintContent: 'Mr. Burger',
			balloonContent: 'Большая Посадская улица, 18'
		});

		myMap.behaviors.disable([
			'drag', 'scrollZoom'
		]);

		marks.add(mark1).add(mark2).add(mark3);

		myMap.geoObjects.add(marks);

	}
	
	return {
		init: function() {
			ymaps.ready(_map);
		}
	}
}());

$(document).ready(function() {
	
	_onePageScroll.init();

	_clickElement.init();

	_accordClick.init();

	_carousel.init();

	_reviewsPopup.init();

	_submitForm.init();

	_yandexMap.init();
});