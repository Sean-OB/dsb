$(window).on('load', function(){
    var pages = $('#slideshow-container #slideshow-images li'), current = 0;
    var captions = $('#slideshow-container .captions li');
    var buttons = $('#slideshow-container .button');
    var prevButton = $('#slideshow-container .prevButton');
    var nextButton = $('#slideshow-container .nextButton');
    var frame = $('#slideshow-container #slideshow-images');
    var currentPage, nextPage, currentCaption, nextCaption;
    var timeoutID;
    var hideButtons;
    var buttonClicked = false;
    var buttonsDisplayed = false;

    var clickHelper = function(diff) {
        clearTimeout(timeoutID);
        buttonClicked = true;
        buttons.off();
        prevButton.off();
        nextButton.off();
        currentPage = pages.eq(current);
        currentCaption = captions.eq(current);
        current += diff;
        if (current < 0) {
            current = pages.length - 1;
        } else if (current > pages.length - 1) {
            current = 0;
        }
        nextPage = pages.eq(current);
        nextCaption = captions.eq(current);
    }

    var clickLeft = function() {
        console.log('prev button');
        clickHelper(-1);
        nextPage.css('marginLeft', -30 + 'em');
        nextPage.show();
        currentCaption.fadeOut(800);
        nextCaption.fadeIn(800);
        nextPage.animate({marginLeft: 0}, 800, () => currentPage.hide());
        currentPage.animate({marginLeft: 30 + 'em'}, 800, function() {
            prevButton.on('click', clickLeft);
            nextButton.on('click', clickRight);
        });
    }

    var clickRight = function() {
        console.log('next button');
        clickHelper(1);
        nextPage.css('marginLeft', 30 + 'em');
        nextPage.show();
        currentCaption.fadeOut(800);
        nextCaption.fadeIn(800);
        nextPage.animate({marginLeft: 0}, 800, function(){() => currentPage.hide()});
        currentPage.animate({marginLeft: -30 + 'em'}, 800, function() {
            prevButton.on('click', clickLeft);
            nextButton.on('click', clickRight);
        });
    };

    var timedHandler=function(){
        if (!buttonClicked) {
            clickRight();
            buttonClicked = false;
            timeoutID=setTimeout(function(){
                timedHandler();	
            }, 7000);
        }
    };

    nextButton.on('click', function(){
        clickRight();
    });

    prevButton.on('click', function() {
        clickLeft();
    });

    buttons.hover(function() {
        clearTimeout(hideButtons);
        buttonsDisplayed = true;
    }, function() {
        hideButtons = setTimeout(function() {
            buttons.fadeOut(400);
            buttonsDisplayed = false;
        }, 3000);
    });

    frame.on('mousemove', function() {
        clearTimeout(hideButtons);
        if (!buttonsDisplayed) {
            buttons.fadeIn(400);
            buttonsDisplayed = true;
        }
        hideButtons = setTimeout(function() {
            buttons.fadeOut(400);
            buttonsDisplayed = false;
        }, 3000);
    });

    timeoutID = setTimeout(function(){
        timedHandler();	
        }, 4000);
    

    // Hide buttons at beginning until we mouse over the frame
    buttons.fadeOut();
})