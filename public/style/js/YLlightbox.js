// JavaScript Document 2015-9-25
/*功能：
		1、图片显示与放大；
		2、图片拖动；
		3、翻页
	使用方法：
		1、将需要放大的图片放到a标签内
		2、设置a标签rel属性为YLlightbox(如：<a href="img/11.jpg" rel="YLlightbox">)
		3、a标签连接为大图的连接地址
		4、a标签包裹在class="YLlightbox"的容器内
		5、只查看当前容器内所有图片
*/
/*=====鼠标移入延迟触发事件方法=====*/
;(function($){
		$.fn.hoverDelay = function(options){
				var defaults = {
						hoverDuring: 200,
						outDuring: 200,
						hoverEvent: function(){
								$.noop();
						},
						outEvent: function(){
								$.noop();    
						}
				};
				var sets = $.extend(defaults,options || {});
				var hoverTimer, outTimer;
				return $(this).each(function(){
						$(this).hover(function(){
								clearTimeout(outTimer);
								hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
						},function(){
								clearTimeout(hoverTimer);
								outTimer = setTimeout(sets.outEvent, sets.outDuring);
						});    
				});
		}      
})(jQuery);
/*=====lightbox方法=====*/
$(function(){
		/*1、图片显示与放大；2、图片拖动；3、翻页*/
		var base_w,base_h,a_flag_index;
		var imgSrcArray=[];		//当前YLlightbox下目标图片的地址集合
		
		//=======点击要放大的图片=======//
		$('#YLlightbox a[rel="YLlightbox"],#YLlightbox a').click(function(e){
				e.preventDefault();
				e.stopPropagation();
				//显示图片
				$('#YLimg').attr('src',$(this).attr('href')).css({width: $(this).attr('data-width')}).addClass('nav-jianbian');
				var widthY = $('#YLimg').width()
				var widthEnd = 1860 * widthY * 0.01
				$('.YLimgwrapTitle').css({width: widthEnd})
				$('#YLimgwrap').fadeIn();
				//获取图片尺寸
				var tranImg=new Image();
				tranImg.src=$('#YLimg').attr('src');
				base_w=tranImg.width;		//图片原始宽度
				base_h=tranImg.height;		//图片原始高度
				//定位
//				var position_top=($(window).height() - $('#YLimg').height() - 45)/2;
//				var position_left=($(window).width() - $('#YLimg').width() -20)/2;
//				$('#YLimgcon').css({'top':position_top,'left':position_left});
				//赋值数组(图片地址)
				imgSrcArray=[];	
				imgWidthArray=[];//先清空
				var total_a=$(this).parents('.YLlightbox').find('a[rel="YLlightbox"]');
				for(var i=0; i<total_a.length; i++){		//开始赋值
						imgSrcArray[i]=total_a.eq(i).attr('href');
						imgWidthArray[i] = total_a.eq(i).attr('data-width');
				}
				a_flag_index=$(this).index();
		});
		$('#YLimgcon .next,#YLimgcon .prev,.YLimgconImageLeft,.YLimgconImageRight').mouseup(function(){
			$('#YLimg').removeClass('nav-jianbian')
		})
		//=======上一页=======//
		$('#YLimgcon .prev,.YLimgconImageLeft').click(function(){
				$('#YLimg').addClass('nav-jianbian').height("").attr('src',imgSrcArray[a_flag_index -1]).css({width: imgWidthArray[a_flag_index -1]});
				var widthY = $('#YLimg').width()
				$('.YLimgwrapTitle').css({width: widthY})
				//获取图片尺寸
				var tranImg=new Image();
				tranImg.src=$('#YLimg').attr('src');
				base_w=tranImg.width;		//图片原始宽度
				base_h=tranImg.height;		//图片原始高度
				//重定位
//				var position_top=($(window).height() - $('#YLimg').height() - 45)/2;
//				var position_left=($(window).width() - $('#YLimg').width() -20)/2;
//				$('#YLimgcon').css({'top':position_top,'left':position_left});
				if(a_flag_index > 1){
						$('#YLimgcon').find('.prev,.next').removeClass('disabled');
				}else{
						$('#YLimgcon').find('.next').show();
						$('#YLimgcon').find('.prev').addClass('disabled');
				}
				a_flag_index-=1;
		});
		//=======下一页=======//
		$('#YLimgcon .next,.YLimgconImageRight').click(function(){
				$('#YLimg').addClass('nav-jianbian').width("").height("").attr('src',imgSrcArray[a_flag_index +1]).css({width: imgWidthArray[a_flag_index + 1]});
				var widthY = $('#YLimg').width()
//				var widthEnd = 1860 * widthY * 0.01
				$('.YLimgwrapTitle').css({width: widthY})
				//获取图片尺寸
				var tranImg=new Image();
				tranImg.src=$('#YLimg').attr('src');
				base_w=tranImg.width;		//图片原始宽度
				base_h=tranImg.height;		//图片原始高度
				//重定位
//				var position_top=($(window).height() - $('#YLimg').height() - 45)/2;
//				var position_left=($(window).width() - $('#YLimg').width() -20)/2;
//				$('#YLimgcon').css({'top':position_top,'left':position_left});
				if(a_flag_index < (imgSrcArray.length-2)){
						$('#YLimgcon').find('.prev,.next').removeClass('disabled');
				}else{
						$('#YLimgcon').find('.next').addClass('disabled');
						$('#YLimgcon').find('.prev').show();
				}
				a_flag_index+=1;
		});
		//=======原大小=======//
		$('#YLimgwrap .YLt_size').click(function(){
				$('#YLimg').width(base_w);		//重置宽高
				$('#YLimg').height(base_h);
				var position_top2=($(window).height() - base_h - 45)/2;
				var position_left2=($(window).width() - base_w -20)/2;
				$('#YLimg').css({'max-height':'','min-height':''});		//清除尺寸限制
				$('#YLimgcon').css({'top':position_top2,'left':position_left2});		//重定位
		});
		//=======显示翻页按钮=======//
//		$("#YLimgcon").hoverDelay({
//				hoverEvent: function(){
//						if(imgSrcArray.length > 1){
//								if(a_flag_index <= 0){
//										$('#YLimgcon').find('.prev').hide();
//										$('#YLimgcon').find('.next').fadeIn();
//								}else if(a_flag_index >= (imgSrcArray.length-1)){
//										$('#YLimgcon').find('.prev').fadeIn();
//										$('#YLimgcon').find('.next').hide();
//								}else{
//										$('#YLimgcon').find('.prev,.next').fadeIn();
//								}
//						}else{
//								$('#YLimgcon').find('.prev,.next').hide();
//						}
//				},
//				outEvent:function(){
//						$('#YLimgcon').find('.prev,.next').fadeOut();
//				}
//		});
		//=======关闭=======//
		$('#YLimgwrap .YLt_close,.YLimgconImageCenter').click(function(){
				$('#YLimg').attr('src','').width("").height("");		//清除属性
				$('#YLimgwrap').fadeOut(1000);
		});
		//=======移动=======//
//		var dragToggle=false;
//		var leftLength,topLength;
//		$('#YLimgcon').mousedown(function(e){
//				e.stopPropagation();
//				e.preventDefault();
//				leftLength=e.pageX - $(this).position().left;
//				topLength=e.pageY - $(this).position().top;
//				
//				dragToggle=true;
//		});
//		$(document).mousemove(function(e){
//				if(dragToggle)
//				$('#YLimgcon').css({'left':e.pageX - leftLength,'top':e.pageY - topLength});
//		}).mouseup(function(){
//				dragToggle=false;
//		});
		//=======鼠标滚动放大缩小图片=======//
//		var p_left=$('#YLimgcon').css('left');
//		var p_top=$('#YLimgcon').css('top');
//		var scrollFunc = function(e){
//				e = e || window.event;
//				e.stopPropagation();
//				if($('#YLimgwrap').css('display') == "block"){
//						e.preventDefault();
//				}
//				var tran_w=$('#YLimg').width();
//				var tran_h=$('#YLimg').height();
//				if (e.wheelDelta) {		//判断浏览器IE，谷歌滑轮事件
//						if (e.wheelDelta > 0) { //当滑轮向上滚动时
//								$('#YLimg').width(tran_w * 1.1);
//								$('#YLimg').height(tran_h * 1.1);
//								$('#YLimg').css({'max-height':'','min-height':''});		//清除尺寸限制
//						}
//						if (e.wheelDelta < 0 && tran_h>50) { //当滑轮向下滚动时
//								$('#YLimg').width(tran_w * 0.9);
//								$('#YLimg').height(tran_h * 0.9);
//								$('#YLimg').css({'max-height':'','min-height':''});		//清除尺寸限制
//						}
//				} else if (e.detail) {		//Firefox滑轮事件
//						if (e.detail> 0 && tran_h>50) { //当滑轮向下滚动时
//								$('#YLimg').width(tran_w * 0.9);
//								$('#YLimg').height(tran_h * 0.9);
//								$('#YLimg').css({'max-height':'','min-height':''});		//清除尺寸限制
//						}
//						if (e.detail< 0) { //当滑轮向上滚动时
//								$('#YLimg').width(tran_w * 1.1);
//								$('#YLimg').height(tran_h * 1.1);
//								$('#YLimg').css({'max-height':'','min-height':''});		//清除尺寸限制
//						}
//				}
//				var tran_position_top=($(window).height() - $('#YLimg').height() - 45)/2;
//				var tran_position_left=($(window).width() - $('#YLimg').width() -20)/2;
//				$('#YLimgcon').css({'top':tran_position_top,'left':tran_position_left});		//重定位
//		}
		//给页面绑定滑轮滚动事件  
//		if (document.addEventListener) {	//firefox
//				document.addEventListener('DOMMouseScroll', scrollFunc, false);
//		}  
		//滚动滑轮触发scrollFunc方法  //ie 谷歌  
//		window.onmousewheel = document.onmousewheel = scrollFunc;
		
		
		/*$('#YLimg').click(function(){
				console.log(a_flag_index);
		});*/
		
//	$('.YLimgconImageCenter').click(function(){
//		$('#YLimgwrap .YLt_close').click();
//	})
//	$('.YLimgconImageRight').click(function(){
//		$('#YLimgcon .next').click();
//	})
//	$('.YLimgconImageLeft').click(function(){
//		$('#YLimgcon .prev').click();
//	})
		
});


//$(window).scroll(function() {
//
//  if ($(document).scrollTop() >= $(document).height() - $(window).height()) {
//  	html = '<a href="img/11.jpg" rel="YLlightbox" data-width="80%"><img src="img/11.jpg"></a><a href="img/12.jpg" rel="YLlightbox" data-width="80%"><img src="img/12.jpg"></a>'
//    $('.YLlightbox').append(html)
//  }
//});

