(function($)
{
	var tipsRoot;
	$('script[src*=tips]').each(function(){
		var s=this.src;
		if(s.match(/tips[^\/]*\.js/i)){tipsRoot=s.replace(/[\?#].*$/, '').replace(/(^|[\/\\])[^\/]*$/, '$1');return false;}
	});
	var tipcss=tipsRoot+"css/jquery.tip.css"
	$('head').append('<link rel="stylesheet" type="text/css" href="'+'" />');

	/*begin*/
	if(window.tips)return false;
	$.fn.tips=function(options)
	{
		var settings=options;
		var $body;
		var $select;
		var messageIdNumber=0;
		var messageId="message_tips";;
		
		if(settings.content==null){settings.content="";}
		if($body==null){$body=$("body");}
		if(!window.XMLHttpRequest&&$select==null){$select=$("select");}
		if($select!=null){$select.css("visibility","hidden");}
		if(settings.type==null){settings.type="warn";}
		if(settings.time==null){settings.time=3000;}
		$.fn.tips.close();
		var messageHtml="";
		messageHtml+='<div class="jquery_tips_wrap" id="'+messageId+'">';
		messageHtml+='	<span class="jquery_tips">';
		if(settings.type=="loading"){messageHtml+='<span class="tips_ico_clear"></span>';}
		messageHtml+='		<span class="tips_ico_'+settings.type+'"></span>';
		messageHtml+='		'+settings.content+'';
		messageHtml+='		<span class="tips_end"></span>';
		messageHtml+='	</span>';
		messageHtml+='</div>';
		
		$body.append(messageHtml);
		var $message=$("#"+messageId);
		$message.slideDown(300);
		if(settings.type!="loading")
		{
			setTimeout(function(){
				$message.animate({width:0,height:0},"toggle",function(){
					$message.remove();
					if ($select!=null){
						$select.css("visibility","visible");
					}
				});
			},settings.time);
		}
	}
	
	$.fn.tips.close=function(){
		$("#message_tips").remove();
	}
	/*over*/
})(jQuery);
