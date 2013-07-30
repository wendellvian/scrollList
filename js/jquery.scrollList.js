/*
 * scrollList v1.0
 * Copyright (c) 2013 Wendell  http://blog.webql.info/
*/
(function($){
	$.fn.extend({
		scrollList:function(options){
			var defaults = {
				visibleCount:6,          // 可视区个数
				space:-10,               // 移动像素（单位px）
				speed:10,                // 移动速度（单位ms）
				aniSpeed:300,            // 运动速度（单位ms）
				margin:1,                // 元素间间隔

				eleLabel:"li",
				slideClass:".slideDiv",
				leftCtrlClass:".leftCtrl",
				rightCtrlClass:".rightCtrl"
			}
			var options = $.extend(defaults,options);
			var thisObj = $(this);

			var eleWidth = $(options.slideClass).find(options.eleLabel).width() + options.margin;
			var eleLength = $(options.slideClass).find(options.eleLabel).length;
			var moveWidth = eleWidth*eleLength;
			var moveLeft = moveWidth-eleWidth*options.visibleCount;
			var vLeft;
			var vCount;
			var timer = null;

			$(options.slideClass).css({width:moveWidth});
			if(eleLength>options.visibleCount){
				$(options.rightCtrlClass).addClass(options.rightCtrlClass.substring(1)+"On");
			}

			$(options.rightCtrlClass).mousedown(function(e){
				if(e.which == 1){
					timer = setTimeout(function(){
						timer = setInterval(function(){
							$(options.slideClass).css({left:$(options.slideClass).position().left+options.space});
							vLeft = parseInt($(options.slideClass).position().left);
							vCount = Math.abs(Math.floor(vLeft/eleWidth));
							vCount > 1 ? $(options.leftCtrlClass).addClass(options.leftCtrlClass.substring(1)+"On") : "";
							vCount >= eleLength-options.visibleCount ? $(options.rightCtrlClass).removeClass(options.rightCtrlClass.substring(1)+"On") : "";
							if(-vLeft >= moveLeft){
								clearInterval(timer);
								$(options.slideClass).css({left:-moveLeft});
							}
						},options.speed);
					},200);
				}
			}).mouseup(function(){
				clearInterval(timer);
				vLeft = parseInt($(options.slideClass).position().left)-1;
				vCount = Math.abs(Math.floor(vLeft/eleWidth));
				vCount >= eleLength-options.visibleCount ? $(options.rightCtrlClass).removeClass(options.rightCtrlClass.substring(1)+"On") : $(options.leftCtrlClass).addClass(options.leftCtrlClass.substring(1)+"On");
				if(-vLeft >= moveLeft){
					$(options.slideClass).css({left:-moveLeft});
				}else{
					$(options.slideClass).animate({left:-eleWidth*vCount},options.aniSpeed);
				}
			});

			$(options.leftCtrlClass).mousedown(function(e){
				if(e.which == 1){
					timer = setTimeout(function(){
						timer = setInterval(function(){
							$(options.slideClass).css({left:$(options.slideClass).position().left-options.space});
							vLeft = parseInt($(options.slideClass).position().left);
							vCount = Math.abs(Math.floor(vLeft/eleWidth));
							vCount <= eleLength-options.visibleCount ? $(options.rightCtrlClass).addClass(options.rightCtrlClass.substring(1)+"On") : "";
							vCount <= 1 ? $(options.leftCtrlClass).removeClass(options.leftCtrlClass.substring(1)+"On") : "";
							if(vLeft >= 0){
								clearInterval(timer);
								$(options.slideClass).css({left:0});
							}
						},options.speed);
					},200);
				}
			}).mouseup(function(){
				clearInterval(timer);
				vLeft = parseInt($(options.slideClass).position().left)+1;
				vCount = Math.abs(Math.floor(vLeft/eleWidth));
				vCount <= eleLength-options.visibleCount ? $(options.rightCtrlClass).addClass(options.rightCtrlClass.substring(1)+"On") : "";
				vCount <= 1 ? $(options.leftCtrlClass).removeClass(options.leftCtrlClass.substring(1)+"On") : "";
				if(vLeft >= 0){
					$(options.slideClass).css({left:0});
				}else{
					$(options.slideClass).animate({left:-eleWidth*vCount+eleWidth},options.aniSpeed);
				}
			});


			return $(this);
		}
	});

})(jQuery);