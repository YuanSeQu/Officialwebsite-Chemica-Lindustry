
$(function () {
    miTouch();//系统交互：触屏效果
    nav();//侧边导航
    banner();// banner
	$("#goBack").click(function(){ 
		// history.back();
		history.go(-1);  
    }); 
    $("#returntop").bind("click", function () {
        $("body, html").stop().animate({ "scrollTop": "0px" });
    });

});
// 系统交互：触屏效果
function miTouch() {
    $(".reLink a,#toolbar .list a").bind({
        "touchstart": function () {
            $(this).addClass("hover");
        }, "touchmove": function () {
            $(this).removeClass("hover");
        }, "touchend": function () {
            $(this).removeClass("hover");
        }
    });

}
//侧边导航
function nav(){
	$("#nav").click(function () {
        if ($(this).hasClass("cur")) {
            $("#subNav").addClass("show");
            $(this).removeClass("cur");
        } else {
            $(this).addClass("cur");
            $("#subNav").removeClass("show");
        }
    });
    $("#subNav .c_clos,#subNav .close").click(function () {
        $("#subNav").removeClass("show").animate({right :"-100%"});
    	$("#nav").addClass("cur");
    });
    $(window).scroll(function() {
		var a = $(document).scrollTop();
		if(a>=200){
			$(".toTop").show();
		}else{
			$(".toTop").hide()
		}
	});
	$(".toTop").bind("click",function() {
 		 $("body, html").stop().animate({"scrollTop":"0px"});
	});
	$('#topsearch').bind('click', function(){
    if($('#search').is(':hidden')){
        $('#search').slideDown(200);
    }else{
        $('#search').slideUp(200);
    }
})


}

/* banner */
function banner() {
    if (!$("#banner").length) { return false; }
    var $a = $("#banner"), length = $a.find("li").length, vi = 0, wid, t, autoPlayTime = 8000, autoAnimateTime = 500, loop = true;
    // 克隆元素
    var clone = $a.find("li").eq(0).clone().addClass("clone"), tipHtml = "";;
    $a.children("ul").append(clone);
    // 生成Tip
    if (length > 1) {
        for (var i = 0; i < length; i++) {
            i == 0 ? tipHtml += "<span class='cur'></span>" : tipHtml += "<span></span>";
        }
        $(".tip").show();
    }
    $(".tip").html(tipHtml);
    // 自适应宽度
    var _init = function () {
        wid = $a.width();
        $a.children("ul").width(wid * (length + 1));
        $a.find("li").width(wid);
        $a.find("img").css({ "width": wid });
        $a.css({ "opacity": 1 });
    }
    // 滚动效果函数
    var _func = function () {
        if (vi >= length) {
            vi = 0;
            _func();
        } else {
            vi++;
            $a.children("ul").css({ "-webkit-transform": "translate3d(-" + wid * vi + "px, 0px, 0px)", "-webkit-transition": "-webkit-transform " + autoAnimateTime + "ms linear" });
            if (vi == length) {
                $(".tip").children("span").eq(0).addClass("cur").siblings().removeClass("cur");
                setTimeout(function () {
                    $a.children("ul").css({ "-webkit-transform": "translate3d(0px, 0px, 0px)", "-webkit-transition": "-webkit-transform 0ms linear" });
                }, autoAnimateTime);
            } else {
                $(".tip").children("span").eq(vi).addClass("cur").siblings().removeClass("cur");
            }
        }
    }
    // 滑动触发效果
    var _touch = function () {
        var o_pagex = 0, o_pagey = 0,   // 接触记录值
			e_pagex = 0, e_pagey = 0;   // 离开记录值
        $a.bind({
            "touchstart": function (e) {
                clearInterval(t);
                o_pagex = e.originalEvent.targetTouches[0].pageX;
                o_pagey = e.originalEvent.targetTouches[0].pageY;
            },
            "touchmove": function (e) {
                e_pagex = e.originalEvent.changedTouches[0].pageX;
                e_pagey = e.originalEvent.changedTouches[0].pageY;
                var xpage = e_pagex - o_pagex;   //::负数-向左边滑动::正数-向右边滑动
                var ypage = e_pagey - o_pagey;
                if (Math.abs(xpage) > Math.abs(ypage)) {
                    if (xpage >= 0) {
                        if (vi <= 0) {
                            $a.children("ul").css({ "-webkit-transform": "translate3d(-" + (wid * length - xpage) + "px, 0px, 0px)", "-webkit-transition": "-webkit-transform 0ms linear" });
                            vi = length;
                        }
                    } else {
                        if (vi >= length) {
                            $a.children("ul").css({ "-webkit-transform": "translate3d(0px, 0px, 0px)", "-webkit-transition": "-webkit-transform 0ms linear" });
                            vi = 0;
                        }
                    }
                    $a.children("ul").css({ "-webkit-transform": "translate3d(-" + (wid * vi - xpage) + "px, 0px, 0px)", "-webkit-transition": "-webkit-transform 0ms linear" });
                    e.preventDefault();
                }
            },
            'touchend': function (e) {
                $a.css({ 'transition': 'transform ' + autoAnimateTime + 'ms linear' });
                e_pagex = e.originalEvent.changedTouches[0].pageX
                e_pagey = e.originalEvent.changedTouches[0].pageY
                if (Math.abs(e_pagey - o_pagey) > 0 && Math.abs(e_pagex - o_pagex) < 20) {
                    vi -= 1;
                    _func();
                } else {
                    if (e_pagex - o_pagex > 0) {  // 手指向右边滑动
                        vi -= 2;
                        _func();
                    } else if (e_pagex - o_pagex < 0) {  // 手指向左边滑动
                        _func();
                    }
                }
                t = setInterval(_func, autoPlayTime);
            }
        });
    }
    _touch();  // 手指滑动触发
    _init();  // 自适应宽度
    t = setInterval(_func, autoPlayTime);
    $(window).resize(_init);  // 改变浏览器宽度
    window.onorientationchange = function () {
        _init();
    };
}
//layout
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
    if (!$(".cateList .box").find("a").length) {
        $(".cateList .box").remove();
        //		$(".cateList h3 s").remove();
    } else {
        $(".cateList h3").click(function () {
            $(".cateList h3 s").toggleClass('rotate1', "");
        });
    }
	
	if($('.box > *').length){
     $('.iconn').show();
}

$('.cateList h3').bind('click', function(){
    if($('.box').is(':hidden')){
        $('.box').slideDown();
    }else{
        $('.box').slideUp();
    }
})
/* 微信提示 */
	var btn=document.getElementById('btn');
	var clipboard=new Clipboard(btn);
	clipboard.on('success', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
	clipboard.on('error', function(e){
		$('#weixin').slideDown().delay(1500).slideUp(500);
		console.log(e);
	});
/* 微信弹窗 */
function dkcf(){$('#wxnr').fadeIn("fast");$('#fdwx').fadeOut("fast");}
function gbcf(){$('#fdwx').fadeIn("slow");$('#wxnr').fadeOut("fast");}