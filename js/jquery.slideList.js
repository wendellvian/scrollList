/*
 * slideList v1.2
 * Copyright (c) 2013-2014 Wendell  http://blog.webql.info/
*/
(function($){
	$.fn.extend({
		slideList:function(options){
			var defaults = {
				slideCount:1,                         // 滚动个数
				space:-10,                            // 移动像素（单位px）
				speed:10,                             // 移动速度（单位ms）
				aniSpeed:300,                         // 运动速度（单位ms）
				margin:0,                             // 元素间间隔
				border:0,                             // 边框宽度
				padding:0,                            // 内边距
				clickOn:false,                        // 整屏滑动开关
				posiLeft:false,                       // 当前层显示末位元素开关
				eleLabel:"li",                        // 运动层子级列表
				slideBoClass:"slideBoDiv",            // 运动层父级
				slideClass:".slideDiv",               // 运动层
				leftCtrlClass:".leftCtrl",            // 左控制键
				rightCtrlClass:".rightCtrl"           // 右控制键
			}
			var options = $.extend(defaults,options);
			var thisObj = $(this);

			var slideBoObj = $(options.slideBoClass);
			var slideObj = $(options.slideClass);
			var rightCtrlObj = $(options.rightCtrlClass);
			var leftCtrlObj = $(options.leftCtrlClass);

			var eleWidth = slideObj.find(options.eleLabel).width() + options.margin + options.border + options.padding;	// 单个元素宽度
			var eleLength = 0;
			slideObj.find(options.eleLabel).each(function(){
				if($(this).is(":visible")){
					eleLength = eleLength + 1;
					return eleLength;	// 返回可视元素的总长度
				}
			});
			var moveWidth = eleWidth*eleLength;	// 滑动层的总宽度
			var moveLeft = moveWidth-eleWidth*options.slideCount;	// 末页超出元素个数偏移量
			var vLeft,vCount,timer = null;

			var page = 1;
			var pageCount = Math.floor(eleLength/options.slideCount);
			// var refull = eleLength%options.slideCount;

			slideBoObj.css({width:eleWidth*options.slideCount});

			// 判断用户是否开启末位定位且元素总个数大于设置个数
			if(options.posiLeft && eleLength > options.slideCount){
				slideObj.css({width:moveWidth,left:-moveLeft});
			}else{
				slideObj.css({width:moveWidth});
			}

			// 共同条件：元素总数是否大于设置个数
			if(eleLength > options.slideCount){
				if(slideObj.position().left == 0){	// 运动元素left值为0时则返回右侧按扭
					rightCtrlObj.addClass(options.rightCtrlClass.substring(1)+"On");
				}
				else if(slideObj.position().left < 0 && slideObj.position().left > -moveLeft){	// 运动元素left值小于0且大于末页超出元素个数偏移量
					leftCtrlObj.addClass(options.leftCtrlClass.substring(1)+"On");
					rightCtrlObj.addClass(options.rightCtrlClass.substring(1)+"On");
				}
				else if(slideObj.position().left < 0 && slideObj.position().left <= -moveLeft){	// 运动元素left值小于0且大于末页超出元素个数偏移量
					leftCtrlObj.addClass(options.leftCtrlClass.substring(1)+"On");
				}
			}


			var mouseCtrl = {
				rightCtrl:{
					mouseDown:function(){
						vLeft = parseInt(slideObj.position().left);
						slideObj.css({left:vLeft + options.space});
						vCount = Math.abs(Math.floor(vLeft/eleWidth));
						vCount > 1 ? leftCtrlObj.addClass(options.leftCtrlClass.substring(1)+"On") : "";
						vCount >= eleLength-options.slideCount ? rightCtrlObj.removeClass(options.rightCtrlClass.substring(1)+"On") : "";
						if(-vLeft >= moveLeft){
							clearInterval(timer);
							slideObj.css({left:-moveLeft});
						}
					},
					mouseUp:function(){
						clearInterval(timer);
						vLeft = parseInt(slideObj.position().left)-1;
						vCount = Math.abs(Math.floor(vLeft/eleWidth));
						vCount >= eleLength-options.slideCount ? rightCtrlObj.removeClass(options.rightCtrlClass.substring(1)+"On") : leftCtrlObj.addClass(options.leftCtrlClass.substring(1)+"On");
						if(-vLeft >= moveLeft){
							slideObj.css({left:-moveLeft});
						}else{
							slideObj.animate({left:-eleWidth*vCount},options.aniSpeed);
						}
					}
				},
				leftCtrl:{
					mouseDown:function(){
						vLeft = parseInt(slideObj.position().left);
						slideObj.css({left:vLeft - options.space});
						vCount = Math.abs(Math.floor(vLeft/eleWidth));
						vCount <= eleLength-options.slideCount ? rightCtrlObj.addClass(options.rightCtrlClass.substring(1)+"On") : "";
						vCount <= 1 ? leftCtrlObj.removeClass(options.leftCtrlClass.substring(1)+"On") : "";
						if(vLeft >= 0){
							clearInterval(timer);
							slideObj.css({left:0});
						}
					},
					mouseUp:function(){
						clearInterval(timer);
						vLeft = parseInt(slideObj.position().left)+1;
						vCount = Math.abs(Math.floor(vLeft/eleWidth));
						vCount <= eleLength-options.slideCount ? rightCtrlObj.addClass(options.rightCtrlClass.substring(1)+"On") : "";
						vCount <= 1 ? leftCtrlObj.removeClass(options.leftCtrlClass.substring(1)+"On") : "";
						if(vLeft >= 0){
							slideObj.css({left:0});
						}else{
							slideObj.animate({left:-eleWidth*vCount+eleWidth},options.aniSpeed);
						}
					}
				}
			}

			if(options.clickOn && pageCount >= page){
				rightCtrlObj.click(function(){
					if(!slideObj.is(":animated")){
						if(page >= pageCount){
							slideObj.animate({left:-moveLeft},options.aniSpeed);
							rightCtrlObj.removeClass(options.rightCtrlClass.substring(1)+"On");
						}else{
							slideObj.animate({left:slideObj.position().left-eleWidth*options.slideCount},options.aniSpeed);
							page++;
							leftCtrlObj.addClass(options.leftCtrlClass.substring(1)+"On");
						}
					}
				});
				leftCtrlObj.click(function(){
					if(!slideObj.is(":animated")){
						if(page <= 1){
							slideObj.animate({left:0},options.aniSpeed);
							leftCtrlObj.removeClass(options.leftCtrlClass.substring(1)+"On");
						}else{
							slideObj.animate({left:slideObj.position().left + eleWidth * options.slideCount},options.aniSpeed);
							page--;
							rightCtrlObj.addClass(options.rightCtrlClass.substring(1)+"On");
						}
					}
				});
			}else if(pageCount >= page){
				rightCtrlObj.mousedown(function(e){
					if(e.which == 1){
						timer = setTimeout(function(){
							timer = setInterval(function(){
								mouseCtrl.rightCtrl.mouseDown();
							},options.speed);
						},200);
					}
				}).mouseup(function(e){
					if(e.which == 1){
						mouseCtrl.rightCtrl.mouseUp();
					}
				});
				leftCtrlObj.mousedown(function(e){
					if(e.which == 1){
						timer = setTimeout(function(){
							timer = setInterval(function(){
								mouseCtrl.leftCtrl.mouseDown();
							},options.speed);
						},200);
					}
				}).mouseup(function(e){
					if(e.which == 1){
						mouseCtrl.leftCtrl.mouseUp();
					}
				});
			}

			return $(this);
		}
	});

})(jQuery);

