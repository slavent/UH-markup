(function(jQuery){
	
	var def_options = {
		speed: 500,
		time: 3000,
		auto: true,
		nav: true,
		nav_dots: true,
		photo_desc: true
	};

	var user_options,

		container = $(".slav_slider"),
		elems = container.find("img"),
		item_html = "<div class='slav_slider__item'></div>",
		nav_html = "<div class='slav_slider__nav'></div>",
		nav_dot_html = "<div class='slav_slider__nav_dot'></div>", 

		nav = {
			btns: container.find(".nav__btn"),
			btn_prev: container.find(".nav__btn_prev"),
			btn_next: container.find(".nav__btn_next"),
		},

		el = {
			number: elems.length,
			width: container.width(),
			height: container.height(),
			index: 0
		};

		// console info
		console.log(el);
		console.log(nav);

	$.fn.slav_slider = 	function(params){

		var options = $.extend({}, def_options, user_options, params),
			container_wrp;

		var init = function(){

			var bindEvents = function(){
				nav.btns.on("click", play);
				container.on("mousever", stop);
				container.on("mouseout", play);
			};

			var makeItemList = function(){
				elems.each(function(){
					$(this).wrap(item_html);
				});
			};

			var makeNav = function(){
				container_wrp.append(nav_html);
			};

			var makeDotNav = function(){
				container_wrp.append(nav_dot_html);
			};

			var makeDescription = function(){
				var elems = $(".slav_slider__item");

				elems.each(function(){
					var desc = $(this).find("img").data("desc");

					$(this).append("<p>" + desc + "</p>");
				});
			};

			container.wrap("<div class='slav_slider__wrp'></div>");
			container_wrp = container.find(".slav_slider__wrp");

			bindEvents();
			makeItemList();

			if(options.nav === true) makeNav();
			if(options.nav_dots === true) makeDotNav();
			if(options.photo_desc === true) makeDescription();

		};

		var play = function(){

			el_index = container.find(".current");

			var direction = function(){

			};

		};

		var stop = function(){

		};

		init();

		return this;

	};


}($));