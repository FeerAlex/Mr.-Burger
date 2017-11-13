let _onePageScroll = (function()  {
	let container	= $('.main'),
		points		= $('.points__link'),
		sections	= $('.section'),
		screen		= 0,
		inScroll	= false;

	$('.section:first-child').addClass('section--active');

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

		let pos		= (-screen * 100) + '%';
		sections.eq(screen).addClass('section--active').siblings().removeClass('section--active');

		container.css('top', pos);

		setTimeout(function() {
			inScroll = false;
		}, 1300);
	};

	let _scrollClick = function(e) {
		points.removeClass('points__link--active');
		let point = points.filter(`[href^='${e.target.hash}']`);
		point.addClass('points__link--active');

		container.stop().animate({
			top: - $(e.target.hash).position().top
		}, 1000);
	}
	
	return {
		init: function() {
			$('body').on('mousewheel', function(e) {
				_scroll(e);
			});

			$('.nav__link, .points__link, .arrow__link').on('click', function(e) {
				e.preventDefault();
				_scrollClick(e);
			});
		}
	}
}());

let _menuClick = (function()  {
	return {
		init: function() {
			$('#gamburger').click(function(){
				$(this).toggleClass('btn-menu--open');
				$('.nav').toggleClass('nav--active');
			});
		}
	}
}());

$(document).ready(function(){
	
	_onePageScroll.init();

	_menuClick.init();
});