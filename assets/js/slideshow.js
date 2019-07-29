$(window).on('load', function(){
    var pages = $('#slideshow-container li'), current = 0;
    var currentPage, nextPage;
    var timeoutID;
    var buttonClicked = 0;

    var handler1 = function() {
        console.log(current);
        buttonClicked = 1;
        $('#slideshow-container .button').off();
        currentPage = pages.eq(current);
        if ($(this).hasClass('prevButton')) {
            if (current <= 0) {
                current = pages.length - 1;
            } else {
                current -= 1;
            }
            nextPage = pages.eq(current);
            nextPage.css('marginLeft', -30 + 'em');
            nextPage.show();
            nextPage.animate({marginLeft: 0}, 800, () => currentPage.hide());
            currentPage.animate({marginLeft: 30 + 'em'}, 800, () => $('#slideshow-container .button').on('click', handler1));
        } else {
            if (current >= pages.length - 1) {
                current = 0;
            } else {
                current += 1;
            }
            nextPage = pages.eq(current);
            nextPage.css('marginLeft', 30 + 'em');
            nextPage.show();
            nextPage.animate({marginLeft: 0}, 800, function(){});
            currentPage.animate({marginLeft: -30 + 'em'}, 800, () => $('#slideshow-container .button').on('click', handler1));
        }
    };

        var handler2=function(){
			if (buttonClicked==0) {
			$('#slideshow-container .button').off('click', handler1);
			currentPage= pages.eq(current);
			if (current >= pages.length-1)
				current=0;
			else
				current=current+1;
			nextPage = pages.eq(current);	
			nextPage.css("marginLeft",604);
			nextPage.show();
			nextPage.animate({ marginLeft: 0 }, 800,function(){
			});
			currentPage.animate({ marginLeft: -604 }, 800,function(){
				currentPage.hide();
				$('#slideshow-container .button').on('click', handler1);
			});
			timeoutID=setTimeout(function(){
				handler2();	
			}, 4000);
			}
		};

		$('#slideshow-container .button').on('click', function(){
			clearTimeout(timeoutID);
			handler1();
		});

        /*
		timeoutID=setTimeout(function(){
			handler2();	
            }, 4000);
            */

})