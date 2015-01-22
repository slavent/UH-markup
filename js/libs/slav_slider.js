(function(jQuery){
	
	var def_options = {
		speed: 500,
		auto: true,
		nav: true,
		nav_dots: true,
		photo_desc: false
	};

	var user_options,

		container = $(".slav_slider"),
		elems = container.find("img"),

		html_wrp = "<div class='slav_slider__wrp'></div>",
		html_item = "<div class='slav_slider__item'></div>",
		html_nav = "<div class='slav_slider__nav'><div class='nav__btn nav__btn_prev'></div><div class='nav__btn nav__btn_next'></div></div>",
		html_nav_dot = "<div class='slav_slider__nav_dot'><div class='dot_wrp'></div></div>",
		html_dot = "<div class='dot'></div>", 

		classCurrent = "current",
		classNavBtn = "nav__btn",
		classDotWrp = "dot_wrp",
		classDot = "dot",

		el = {
			number: elems.length,
			width: elems.width(),
			height: container.height(),
			index: 0
		};

	$.fn.slav_slider = 	function(params){

		var options = $.extend({}, def_options, user_options, params),
			container_wrp;

		var init = function(){

			var bindEvents = function(){
				//container.on("mousever", stop);
				//container.on("mouseout", play);
			};

			var makeItemList = function(){
				container.wrap(html_wrp);
				container_wrp = container.parent();

				elems.each(function(){
					$(this).wrap(html_item);
				});

				container.children().eq(0).addClass(classCurrent);
			};

			var makeNav = function(){
				container_wrp
					.append(html_nav)
					.find("." + classNavBtn).on("click", play);
			};

			var makeDotNav = function(){
				container_wrp.append(html_nav_dot);


				for(var i = 0; i < elems.length; i++)
					$("." + classDotWrp).append(html_dot);

				container_wrp.find("." + classDot).eq(0).addClass(classCurrent);
				container_wrp.find("." + classDot).on("click", play);
			};

			var makeDescription = function(){
				var elems = container.children();

				elems.each(function(){
					var desc = $(this).find("img").data("desc");

					$(this).append("<p>" + desc + "</p>");
				});
			};

			bindEvents();
			makeItemList();

			if(options.nav === true) makeNav();
			if(options.nav_dots === true) makeDotNav();
			if(options.photo_desc === true) makeDescription();

		};

		var play = function(){

			var container_mLeft = parseInt(container.css("marginLeft")),
				el_index = container.find("." + classCurrent).index(),
				width = el.width;

			var stateClass = function(dir){
				if(dir == "prev") var ind = el_index - 1;
				if(dir == "next") var ind = el_index + 1;
				if(!isNaN(dir)) var ind = dir;

				container.children().removeClass(classCurrent);
				container.children().eq(ind).addClass(classCurrent);

				container_wrp.find("." + classDot).removeClass(classCurrent);
				container_wrp.find("." + classDot).eq(ind).addClass(classCurrent);
			};

			if($(this).hasClass("dot")){

				var i = $(this).index();

				container.animate({"marginLeft": -width * i}, options.speed);
				stateClass(i);

			} else {

				if($(this).hasClass("nav__btn_prev")){
					if(el_index == 0) return false;
					stateClass("prev");
					width = width;
				}

				if($(this).hasClass("nav__btn_next")){
					if(el_index == elems.length - 1) return false;
					stateClass("next");
					width = -width;
				}

				container.animate({"marginLeft": container_mLeft + width}, options.speed);

			}

		};

		var stop = function(){

		};

		init();

		return this;

	};


}($));