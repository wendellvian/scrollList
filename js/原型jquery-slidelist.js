$(function(){
	var vSpeedCount = 6;	// 可视数
	var liwidth = $(".slidLis li").width() + 1;
	var lilength = $(".slidLis li").length;
	var ulwidth = liwidth*lilength;
	var moveLeft = ulwidth-liwidth*vSpeedCount;
	var space = -10;
	var speed = 10;
	var timer = null;
	var vLeft;
	var vCount;

	$(".slidLis ul").css({width:ulwidth});
	$(".scRight").mousedown(function(e){
		if(e.which == 1){
			timer = setInterval(function(){
				$(".slidLis ul").css({left:$(".slidLis ul").position().left+space});
				vLeft = parseInt($(".slidLis ul").position().left);
				vCount = Math.abs(Math.floor(vLeft/liwidth));
				if(-vLeft >= moveLeft){
					clearInterval(timer);
					$(".slidLis ul").css({left:-moveLeft});
				}
			},speed);
		}
	});
	$(".scRight").mouseup(function(){
		clearInterval(timer);
		if(-vLeft >= moveLeft){
			$(".slidLis ul").css({left:-moveLeft});
		}else{
			$(".slidLis ul").animate({left:-liwidth*vCount},300);
		}
		
	});

	$(".scLeft").mousedown(function(e){
		if(e.which == 1){
			timer = setInterval(function(){
				$(".slidLis ul").css({left:$(".slidLis ul").position().left-space});
				vLeft = parseInt($(".slidLis ul").position().left);
				vCount = Math.abs(Math.floor(vLeft/liwidth));
				if(vLeft >= 0){
					clearInterval(timer);
					$(".slidLis ul").css({left:0});
				}
			},speed);
		}
	});
	$(".scLeft").mouseup(function(){
		clearInterval(timer);
		if(vLeft >= 0){
			$(".slidLis ul").css({left:0});
		}else{
			$(".slidLis ul").animate({left:-liwidth*vCount+liwidth},300);
		}
	});
});