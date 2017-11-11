$(document).ready(function(){
	$('#gamburger').click(function(){
		$(this).toggleClass('btn-menu--open');
		$('.header__nav').toggleClass('header__nav--active');
	});
});