var mtl = (function (Main) {
	"use strict";

	var paragraphs = {
		latim: $('.paragraphs_latim'),
		ptbr:$('.paragraphs_ptbr'),
	}

	Main.current_lang = '.paragraphs_ptbr';
	Main.number = 3;

	Main.init = function(){
		number_paragraphs(Main.number);
		listen();
		phrases();
	};

	Main.set_number_paragraphs = function(number){
		return number_paragraphs(number);
	}

	function listen(){
		$('.paragraphs').find('article').hide();
		$('.paragraphs').find(Main.current_lang).show();

		$('.btn-choose').on('click',choose_lang);
	}

	function choose_lang(e){
		e.preventDefault();

		var lang = $(this).data('lang');

		Main.current_lang = lang;

		$('.btn-choose').each(function(){
			$(this).removeClass('active');
			$(this).removeClass('btn-warning');
			$(this).addClass('btn-success');
		});

		$(this).addClass('active btn-warning');

		$('.paragraphs').find('article').hide();
		$('.paragraphs').find(Main.current_lang).show();

		number_paragraphs(Main.number);

	}

	function number_paragraphs(number){
		$(Main.current_lang).find('p').hide();

		for(var i = 0; i < number; i ++){
			$(Main.current_lang).find('p').eq(i).show();
		}

		Main.number = number;
	}

	function phrases(){
		$('.phrases').slick({
		  infinite: true,
		  fade:true,
		  autoplaySpeed:3000, 
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows:false,
		  dots:false,
		  autoplay:true,
		  cssEase:'easeInCirc'
		});
	}

	var sort_phrases = function(){

			var pause = 3000; // define the pause for each tip (in milliseconds) 
			var length = $(".phrases li").length; 
			var temp = -1;		

			sort_phrases.getRan = function(){
				// get the random number
				var ran = Math.floor(Math.random()*length) + 1;
				return ran;
			};
			sort_phrases.show = function(){
				var ran = sort_phrases.getRan();
				// to avoid repeating
				while (ran == temp){
					ran = sort_phrases.getRan();
				}; 
				temp = ran;
				$(".phrases li").hide();	
				$(".phrases li:nth-child(" + ran + ")").fadeIn("fast");		
			};
			
			sort_phrases.show(); setInterval(sort_phrases.show,sort_phrases.pause);
			
	};

	return Main;

})(mtl || {});


mtl.init();