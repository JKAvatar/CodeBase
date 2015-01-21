$.fn.page = function(opt){
	var $item = $(this);
	var defaultOpt = {
			size : 5,
			total : 1,
			cur : 1,
			click : 'jump',
			link : 'www.baidu.com?page='
		};
	opt = $.extend(defaultOpt, opt || {});
	var firstTime = true,
		step = Math.floor(opt.size/2);
	
	
	function renderNav(i){
		if(opt.click == 'jump' && !firstTime){
			return false;
		}
		opt.cur = i;
		firstTime = false;
		var htmlStr = '';
		if(opt.total > 0){
			$item.find('.page-nav').remove();
			htmlStr += '<ul class="page-nav">';
			if(opt.total == 1){
				htmlStr += '<li class="curr-page"><a href="javascript:void(0)" data-page="1">1</a></li>';
			} else {
				if(opt.total <= opt.size){
					for(var i = 1;i <= opt.total;i++){
						htmlStr += '<li'+ (opt.cur == i ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="'+ i +'">'+ i +'</a></li>';
					}
				} else {
					if(opt.cur > 1){
						htmlStr += '<li class="prev-page"><a href="javascript:void(0)" data-page="'+ (opt.cur - 1) +'">上一页</a></li>';
					}
					htmlStr += '<li'+ (opt.cur == 1 ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="1">1</a></li>';
					
					if(opt.cur - step <= 1){
						for(var j = 2;j <= opt.size - 1;j++){
							htmlStr += '<li'+ (opt.cur == j ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="'+ j +'">'+ j +'</a></li>';
						}
						htmlStr += '<li class="skip"><a href="javascript:void(0)">...</a></li>';
					} else if(opt.cur + step >= opt.total){
						htmlStr += '<li class="skip"><a href="javascript:void(0)">...</a></li>';
						for(var k = opt.total - opt.size + 2;k < opt.total;k++){
							htmlStr += '<li'+ (opt.cur == k ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="'+ k +'">'+ k +'</a></li>';
						}
					} else {
						htmlStr += '<li class="skip"><a href="javascript:void(0)">...</a></li>';
						
						for(var m = opt.cur - step + 1;m <= opt.cur + step - 1;m++){
							htmlStr += '<li'+ (opt.cur == m ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="'+ m +'">'+ m +'</a></li>';
						}
						
						htmlStr += '<li class="skip"><a href="javascript:void(0)">...</a></li>';
					}
					
					htmlStr += '<li'+ (opt.cur == opt.total ? ' class="curr-page"' : '') +'><a href="javascript:void(0)" data-page="'+ opt.total +'">'+ opt.total +'</a></li>';
					if(opt.cur < opt.total){
						htmlStr += '<li class="next-page"><a href="javascript:void(0)" data-page="'+ (opt.cur + 1) +'">下一页</a></li>';
					}
					
					htmlStr += '<li class="page-jump">跳转至<input type="text">页</li><li><a href="javascript:void(0)" class="goPage">确定</a></li>';
				}
			}
			htmlStr += '</ul>';
		}
		$item.append(htmlStr);
	}
	renderNav(opt.cur);
	
	$item.undelegate('.page-nav a','click').delegate('.page-nav a','click',function(){
		var $this = $(this),
			page = 1;
		if($this.parent().hasClass('skip')){
			return false;
		} else if($this.hasClass('goPage')){
			page = parseInt($item.find('.page-jump input').val(),10);
			if(isNaN(page) || page < 1){
				page = 1;
			} else if(page > opt.total){
				page = opt.total;
			}
		} else {
			page = $this.data('page');
			if(page == opt.cur) return false;
		}
		
		renderNav(page);
		if(opt.click == 'jump'){
			location.href = opt.link + page;
		} else {
			opt.callback(page);
		}
		return false;
	});
};