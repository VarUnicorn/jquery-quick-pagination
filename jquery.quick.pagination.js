//-------------------------------------------------
//		Quick Pager jquery plugin
//		Created by dan and emanuel @geckonm.com
//		www.geckonewmedia.com
// 
//
//		18/09/09 * bug fix by John V - http://blog.geekyjohn.com/
//		1.2 - allows reloading of pager with new items
//-------------------------------------------------

(function($) {
	    
	$.fn.quickPager = function(options) {
	
		var defaults = {
			pageSize: 10,
			currentPage: 1,
			holder: null,
			pagerLocation: "after",
			nextButton: false,
			seeAllButton: false,
			seeAllText: "See all"
		};
		
		var options = $.extend(defaults, options);
		
		return this.each(function() {
	
						
			var selector = $(this);	
			var pageCounter = 1;
			
			
			selector.wrap("<div class='simplePagerContainer'></div>");
			
			selector.parents(".simplePagerContainer").find("ul.simplePagerNav").remove();
			
			selector.children().each(function(i){ 
					
				if(i < pageCounter*options.pageSize && i >= (pageCounter-1)*options.pageSize) {
				$(this).addClass("simplePagerPage"+pageCounter);
				}
				else {
					$(this).addClass("simplePagerPage"+(pageCounter+1));
					pageCounter ++;
				}	
				
			});
			
			// show/hide the appropriate regions 
			selector.children().hide();
			selector.children(".simplePagerPage"+options.currentPage).show();
			
			if(pageCounter <= 1) {
				return;
			}
			
			//Build pager navigation
			var pageNav = "<ul class='simplePagerNav'>";	
			for (i=1;i<=pageCounter;i++){
				if (i==options.currentPage) {
					pageNav += "<li class='currentPage simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";	
				}
				else {
					pageNav += "<li class='simplePageNav"+i+"'><a rel='"+i+"' href='#'>"+i+"</a></li>";
				}
			}
			
			if (options.nextButton){
				pageNav += "<li class='simplePageNavNextButton prev'><span href='#' hidden> < </span></li>";
				pageNav += "<li class='simplePageNavNextButton next'><span href='#'> > </span></li>";
			}
				
			
			if (options.seeAllButton){
				pageNav += "<li class='simplePageNavSeeAll'><span href='#'> "+ options.seeAllText +" </span></li>";
			}
				
			
			pageNav += "</ul>";
			
			if(!options.holder) {
				switch(options.pagerLocation)
				{
				case "before":
					selector.before(pageNav);
				break;
				case "both":
					selector.before(pageNav);
					selector.after(pageNav);
				break;
				default:
					selector.after(pageNav);
				}
			}
			else {
				$(options.holder).append(pageNav);
			}
			
			//pager navigation behaviour
			selector.parent().find(".simplePagerNav a").click(function() {
					
				//grab the REL attribute 
				var clickedLink = $(this).attr("rel");
				options.currentPage = clickedLink;
				
				if(options.holder) {
					$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
					$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
				else {
					//remove current current (!) page
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
					//Add current page highlighting
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
				
				//hide and show relevant links
				selector.children().hide();			
				selector.find(".simplePagerPage"+clickedLink).show();
				
				return false;
			});
			
			
			selector.parent().find(".simplePageNavNextButton span").click(function() {
				
				var currentPageRel = $('.currentPage');
				
				var clickedLink = $(currentPageRel).find('a').attr('rel');
				// Foward or backward page
				if ($(this).parent().hasClass('next')) clickedLink = parseInt(clickedLink) + 1;
				else clickedLink = parseInt(clickedLink) - 1;
				
				if (clickedLink <= 0) clickedLink = 1;
				
				// Hide or show next/prev element
				if (clickedLink > 1) $('.simplePageNavNextButton.prev span').show();
				else $('.simplePageNavNextButton.prev span').hide();
				
				if (clickedLink == pageCounter) $('.simplePageNavNextButton.next span').hide();
				else $('.simplePageNavNextButton.next span').show();
				
				options.currentPage = clickedLink;
				
				if(options.holder) {
					$(this).parent("li").parent("ul").parent(options.holder).find("li.currentPage").removeClass("currentPage");
					$(this).parent("li").parent("ul").parent(options.holder).find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
				else {
					//remove current current (!) page
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("li.currentPage").removeClass("currentPage");
					//Add current page highlighting
					$(this).parent("li").parent("ul").parent(".simplePagerContainer").find("a[rel='"+clickedLink+"']").parent("li").addClass("currentPage");
				}
				
				//hide and show relevant links
				selector.children().hide();			
				selector.find(".simplePagerPage"+clickedLink).show();
				
				return false;
			});
			
			selector.parent().find(".simplePageNavSeeAll span").click(function() {
				var allLi = $('.simplePagerContainer ul li');
				$.each(allLi, function( index, value ) {
					$(value).css('display', 'liste-item');
				});
				
				return false;
			});
		});
	}

})(jQuery);
