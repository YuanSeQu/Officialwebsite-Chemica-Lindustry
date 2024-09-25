$(function(){
	/(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent) && (head = document.getElementsByTagName("head"), viewport = document.createElement("meta"), viewport.name = "viewport", viewport.content = "target-densitydpi=device-dpi, width=1200px, user-scalable=no", head.length > 0 && head[head.length - 1].appendChild(viewport));
	share();
	toolbar();//右侧悬浮
	banner();
	String.prototype.trim = function () {
	    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}
	
});
//toolbar
function toolbar(){
	$('#toolbar dd').bind({
        'mouseenter': function () {
            if ($(this).children('.slide').length) {
                var _this = $(this).children('.slide');
                _this.stop(true, true).animate({ 'width': 180 }, 200);
            } else if ($(this).children('.pop').length) {
                var _this = $(this).children('.pop');
                _this.show().animate({ 'right': 65 }, 180);
            }
        },
        'mouseleave': function () {
            if ($(this).children('.slide').length) {
                var _this = $(this).children('.slide');
                _this.stop(false, false).animate({ 'width': 0 }, 200);
            } else if ($(this).children('.pop').length) {
                var _this = $(this).children('.pop');
                _this.hide().animate({ 'right': 90 },190);
            }
        }
    });
	$("#toolbar .tanbtn").click(function(){
		$(".dig").show();
		layout(1);
		$('.dig .d_tit').find("b").text($(this).text());
	})
	$(".dig .icon_close").click(function(){
		$(".dig").hide();
		layout(0);
	})
	$("#gotop").click(function() {
		$("body, html").stop().animate({
				"scrollTop": 0
		});
	});
	$(".honorlist").slide({mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:4});
	/*$(".header .mobile").hover(function() {
		$(".header").find(".imgbox").stop().slideDown(200);
	}, function() {
		$(".header").find(".imgbox").stop().slideUp(200);
	});*/

	
	$("#Raiders").slide({mainCell:".bd ul",autoPlay:true,delayTime:500,interTime:6000});
	$(".history").slide({ mainCell:".bd ul", effect:"left", trigger:"click", pnLoop:false });		
	$("#teambox").slide({mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:4});
	$("#ihonor").slide({mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:4});
	$(".showImg_left").slide({titCell:".hd ul",mainCell:".bd ul",autoPage:true,effect:"left",autoPlay:true,vis:1,delayTime:1000});

}
// banner焦点图
function banner() {
	if (!$("#banner").length || $("#banner li").length <= 1) {	return false; }
	$("#banner ul li:gt(0)").css({"display":"none"});
	var b = $("#banner"),
		me = $("#banner ul"),
		tip = $("#banner .tip"),
		t, interval = 10000,
		speed = 1000,
		speed2 = 700,
		n = 0,
		N = me.children("li").length;
		wid = b.children("li").width();
		step = 200,time = 3000;
	if ($("#banner .tip").length) {
		var htmlTip = "";
		for (var i = 0; i < N; i++) {
			if (i == 0) {
				htmlTip += "<span class='cur'>"+(i+1)+"</span>";
			} else {
				htmlTip += "<span>"+(i+1)+"</span>";
			}
		}
		tip.html(htmlTip);
	}
	var func = function() {
		if (n >= N - 1) {
			n = 0;
		}else if(n < -1){
			n = N-1;
		}
		else {
			n++;
		}
		me.children("li").eq(n).css({
			"z-index": 2
		}).stop().fadeIn(speed).siblings("li").css({
			"z-index": 1
		}).stop().fadeOut(speed2);
		if ($("#banner .tip").length) {
			tip.children("span").eq(n).addClass("cur").siblings("span").removeClass("cur");
		}
	}
	$("#banner").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
		},function(){
		$("#btn_prev,#btn_next").fadeOut()
		})
	$dragBln = false;
	 $("#btn_prev").click(function(){
	      clearInterval(t); 
		  n -= 2;
	      func();
	      t = setInterval(func, time)
	  });
	  $("#btn_next").click(function(){
	      clearInterval(t);
	      func();
	      t = setInterval(func, time)
	  });
	  
	tip.children("span").click(function() {
		clearInterval(t);
		n = $(this).index() - 1;
		func();
		t = setInterval(func, interval);
	})
	$("#banner ul.list li").mouseenter(function() {
		clearInterval(t);
	}).mouseleave(function() {
		t = setInterval(func, time);
	});
	t = setInterval(func, interval);
}


function layout(u){
	var $obj = $('<div class="dialog-layout"></div>');
	if(u == 0){
		$('.dialog-layout').remove();
	}else{
		if(!$('.dialog-layout').length){
			$obj.appendTo('body').show();
		}
	}
}
function share(){
	window._bd_share_config = {
    "common": {
        "bdSnsKey": {},
        "bdText": "",
        "bdMini": "2",
        "bdMiniList": false,
        "bdPic": "",
        "bdStyle": "0",
        "bdSize": "16"
    },
    "share": {},
    "slide": { // 跟图标式的代码相比，这里是添加了浮窗式 slide 属性配置
        "type": "slide",
        "bdImg": "5",
        "bdPos": "left",
        "bdTop": "100"
    }
};
	window._bd_share_config = {
		share : [{
			"bdSize" : 16
		}],
	}
	with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion='+~(-new Date()/36e5)];
}