$(document).scroll(function(){
	//导航栏的定位
	var scroTop = $('.nav-hidden').height();
	if ( $(document).scrollTop() > scroTop){
		$('.nav-hidden-position').slideDown(600)
	}
	if ( $(document).scrollTop() <= scroTop ) {
		$('.nav-hidden-position').slideUp(200)
	}
	//返回顶部
	$('.nav-hidden .nav-top').click(function(){
		$('html,body').stop().animate({'scrollTop':0},500);
	})
	//滚动时，菜单页向上
	var WindowHeightH = $('.nav-show').height()
	var WindowHeightS = $('.nav-show').offset().top
	if( $(window).scrollTop() > WindowHeightS + WindowHeightH || $(window).scrollTop() < WindowHeightS - WindowHeightH || $(window).scrollTop() == 0 ) {
		$('.nav-show').slideUp(1000)
		$('.nav-back .line').removeClass('shuxian')
	}
})
$(function(){
	//懒加载。。。
	$("img.lazy").lazyload({effect: "fadeIn"});
	//点击横线出来菜单页
	$('.nav-hidden-position .line').click(function(){
		$('.nav-jianbian .line').click();
	})
	$('.nav-jianbian .line').click(function(){
		var WindowHeight = $(window).scrollTop() 
		$('.nav-show').css({'top':WindowHeight})
		$(this).addClass('shuxian')
		$('.nav-show').slideDown(1000)
		$('.nav-show li').addClass('myfadeIn')
		$('.nav-bottom').removeClass('heng')
	})
	//切换
	$('.nav-tabs li').click(function(){
		var index = $(this).index();
		$(this).addClass('active').siblings().removeClass('active')
		$(this).parents('.ul-wapper').siblings('.tab-content').find('.tab-pane')
		.eq(index).addClass('active').siblings().removeClass('active')
	})
	function clickAdd () {
		$('.nav-jianbian .line').one('click',function(){
			$('#category_01').mCustomScrollbar()
	    })
	}
	clickAdd ();
	
	$('#category_title02').one('click',function(){
		$('#category_02').mCustomScrollbar()
	})
	$('#category_title03').one('click',function(){
		$('#category_03').mCustomScrollbar()
	})
	$('#category_title04').one('click',function(){
		$('#category_04').mCustomScrollbar()
	})
	
	//点击变横线
	$('.nav-bottom').click(function(){
		$('.nav-back .line').removeClass('shuxian')
		$(this).addClass('heng')
		$('.nav-show').slideUp(1000)
	})
	//点击a跳转到固定位置
//	$('.nav-show .nav-mian-list li a').click(function(){
//		$('.nav-back .line').removeClass('shuxian')
//		$(this).addClass('heng')
//		$('.nav-show').slideUp(1000)
//	})
	//指向图片变换箭头
	$(document).mousemove(function(e){   
	     x = e.pageX;  
	     y = e.pageY;   
	     //x的值相对于文档的左边缘。y的值相对于文档的上边缘  
		//x,y是全局变量;  
		//判断鼠标是否在某DIV中  
		var div = $('#YLimg');//获取你想要的DIV  
		var y1 = div.offset().top;  //div上面两个的点的y值  
		var y2 = y1 + div.height();//div下面两个点的y值  
		var x1 = div.offset().left;  //div左边两个的点的x值  
		var x2 = x1 + div.width();  //div右边两个点的x的值  
		// 小智
        if( x < x1 || x > x2 || y < y1 || y > y2){
            $('.YLimgconImageLeft').css({cursor :'url("./img/left-b.ico"),auto'})
            $('.YLimgconImageRight').css({cursor :'url("./img/right-b.ico"),auto'})
            $('.YLimgconImageCenter').css({cursor :'url("./img/cha-w.ico"),auto'})
        }else{
            $('.YLimgconImageLeft').css({cursor :'url("./img/left-w.ico"),auto'})
            $('.YLimgconImageRight').css({cursor :'url("./img/right-w.ico"),auto'})
            $('.YLimgconImageCenter').css({cursor :'url("./img/cha-w.ico"),auto'})
        };
        // 小智 end
    });
})
//
//function(){
//$(window).load(function(){
//      $(".nav-show .tab-content .nav-mian-list").mCustomScrollbar();
//  });
//})