(function($) {

	/*---------------------------
	 Defaults for Reveal
	----------------------------*/
		 
	/*---------------------------
	 Listener for data-reveal-id attributes
	----------------------------*/

	$('body').delegate('*[data-reveal-id]','click',function(e){
		e.preventDefault();
		var modalLocation = $(this).attr('data-reveal-id');
		$('#'+modalLocation).reveal($(this).data());
	});

	/*---------------------------
	 Extend and Execute
	----------------------------*/

    $.fn.reveal = function(options) {
        
        var defaults = {  
	    	animation: 'fadeAndPop', //fade, fadeAndPop, none
		    animationspeed: 500, //how fast animtions are
		    closeonbackgroundclick: true, //if you click background will modal close?
		    dismissmodalclass: 'close-reveal-modal' //the class of a button or element that will close an open modal
    	}; 
    	
        //Extend dem' options
        var options = $.extend({}, defaults, options);
	
        return this.each(function() {
        
			/*---------------------------
			 Global Variables
			----------------------------*/
        	var modal = $(this),
        		topMeasure  = parseInt(modal.css('top')),
				topOffset = modal.height() + topMeasure,
          		locked = false,
				modalBG = $('.reveal-modal-bg');

			/*---------------------------
			 Create Modal BG
			----------------------------*/
			if(modalBG.length == 0) {
				modalBG = $('<div class="reveal-modal-bg" />').insertBefore(modal);
			}		    
     
			/*---------------------------
			 Open & Close Animations
			----------------------------*/
			//Entrance Animations
			modal.bind('reveal:open', function () {
				modalBG.unbind('click.modalEvent');
				$('.' + options.dismissmodalclass).unbind('click.modalEvent');
				if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modal.css({'top': $(document).scrollTop()-topOffset,"left":$(document).scrollLeft() + ($(window).width() - modal.outerWidth())/2, 'opacity' : 0, 'visibility' : 'visible','display':'block'});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"top": $(document).scrollTop() + ($(window).height() - modal.outerHeight())/2,
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					}
					if(options.animation == "fade") {
						modal.css({'opacity' : 0, 'visibility' : 'visible','display':'block', 'top': $(document).scrollTop()+topMeasure});
						modalBG.fadeIn(options.animationspeed/2);
						modal.delay(options.animationspeed/2).animate({
							"opacity" : 1
						}, options.animationspeed,unlockModal());					
					} 
					if(options.animation == "none") {
						modal.css({'visibility' : 'visible','display':'block', 'top':$(document).scrollTop()+topMeasure});
						modalBG.css({"display":"block"});	
						unlockModal();				
					}
				}
				modal.unbind('reveal:open');
			}); 	

			//Closing Animation
			modal.bind('reveal:close', function () {
			  if(!locked) {
					lockModal();
					if(options.animation == "fadeAndPop") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"top":  $(document).scrollTop()-topOffset + 'px',
							"opacity" : 0
						}, options.animationspeed/2, function() {
							modal.css({'top':topMeasure, 'opacity' : 0, 'visibility' : 'hidden','display':'none'});
							unlockModal();
						});					
					}  	
					if(options.animation == "fade") {
						modalBG.delay(options.animationspeed).fadeOut(options.animationspeed);
						modal.animate({
							"opacity" : 0
						}, options.animationspeed, function() {
							modal.css({'opacity' : 0, 'visibility' : 'hidden','display':'none', 'top' : topMeasure});
							unlockModal();
						});					
					}  	
					if(options.animation == "none") {
						modal.css({'visibility' : 'hidden','display':'none', 'top' : topMeasure});
						modalBG.css({'display' : 'none'});	
					}		
				}
				modal.unbind('reveal:close');
			});     
   	
			/*---------------------------
			 Open and add Closing Listeners
			----------------------------*/
        	//Open Modal Immediately
			modal.trigger('reveal:open')
			
			//Close Modal Listeners
			var closeButton = $('.' + options.dismissmodalclass).bind('click.modalEvent', function () {
				modal.trigger('reveal:close');
			});
			
//			if(options.closeonbackgroundclick) {
//				modalBG.css({"cursor":"pointer"});
//				modalBG.bind('click.modalEvent', function () {
//					modal.trigger('reveal:close');
//				});
//			}
			$('body').keyup(function(e) {
        		if(e.which===27){ modal.trigger('reveal:close'); } // 27 is the keycode for the Escape key
			});
			
			
			/*---------------------------
			 Animations Locks
			----------------------------*/
			function unlockModal() { 
				locked = false;
			}
			function lockModal() {
				locked = true;
			}	
			
			//启动拖拽
			var dragging = false;
            var iX, iY;
            modal.find('.reveal-head').mousedown(function(e) {
                dragging = true;
                var offset = modal.offset();
                iX = e.clientX - offset.left;
                iY = e.clientY - offset.top;
                //this.setCapture && this.setCapture();
                return false;
            });
            document.onmousemove = function(e) {
                if (dragging) {
                var e = e || window.event;
                var oX = e.clientX - iX;
                var oY = e.clientY - iY;
                if(oX < 0) oX = 0;
                if(oY < 0) oY = 0;
                if(oX + modal.outerWidth() > $('.wrapper-level1').width()) oX = $('.wrapper-level1').width() - modal.outerWidth();
                if(oY + modal.outerHeight() > $('.wrapper-level1').height()) oY = $('.wrapper-level1').height() - modal.outerHeight();
                modal.css({"left":oX + "px", "top":oY + "px"});
                return false;
                }
            };
            $(document).mouseup(function(e) {
                dragging = false;
                //modal[0].releaseCapture && modal[0].releaseCapture();
                e.cancelBubble = true;
            });
        });//each call
    };//orbit plugin call
})(jQuery);
        
