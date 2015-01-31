$(function(){
	$(".col__nav_header li").hover(
		function(){
			$(this).find(".col__hover").stop(true).fadeIn();
		},
		function(){
			$(this).find(".col__hover").stop(true).fadeOut();
		}
	);
});
