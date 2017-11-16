let _onePageScroll = (function()  {
	let container	= $('.main'),
		points		= $('.points__link'),
		sections	= $('.section'),
		screen		= 0,
		inScroll	= false;

	$('.section:first-child').addClass('section--active');
	$('.points__item:first-child .points__link').addClass('points__link--active');

	let _activePoints = (active) => {
		points.removeClass('points__link--active');
		points.filter(`[href^='${active}']`).addClass('points__link--active');
	}

	let _moveTo = () => {
		let pos		= (-screen * 100) + '%';

		sections.eq(screen).addClass('section--active').siblings().removeClass('section--active');
		container.css('top', pos);

		// container.animate({
		// 	top: pos
		// }, 500, function() {
		// 	console.log('anim', pos);
		// });
		_activePoints(`#section-${screen + 1}`);
	}

	let _scroll = (e) => {
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

	let _scrollClick = (e) => {
		let tar = $(e.target);
		screen = parseInt(tar.attr('data-section'));

		_moveTo();
	}
	
	return {
		init: function() {
			$('body').on('mousewheel', (e) => {
				_scroll(e);
			});

			$('.nav__link, .points__link, #order, #about').on('click', (e) => {
				e.preventDefault();
				_scrollClick(e);
			});
		}
	}
}());

let _accordClick = (function() {
	let _showTeam = (e) => {
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

	let _showMenu = (e) => {
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
			$('.team__link').click(e => {
				_showTeam(e);
			});

			$('.menu__link').click(e => {
				_showMenu(e);
			});
		}
	}
}());

let _menuClick = (function()  {
	return {
		init: function() {
			$('#gamburger').click((e) => {
				let tar = $(e.target);
				
				tar.toggleClass('btn-menu--open');
				$('.nav').toggleClass('nav--active');
			});
		}
	}
}());

$(document).ready(() => {
	
	_onePageScroll.init();

	_menuClick.init();

	_accordClick.init();
});