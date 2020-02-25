
// wait until $(this) object is visible  - receives handle to clear setInterval if needed
// then check if all panels are open set equal columns
(function($){
	$.fn.checkVisible = function(handle,$accordion){
		
		// check if tgl_panel is visible to set height on all panels
		if($(this).is(':visible')) {
			if(handle != null){clearInterval(handle);}		
			
			var atLeastTwoVisible = true;
			$accordion.find('details').each(function(index){				
				if(!$(this).is('[open]')) {
					atLeastTwoVisible |= true;
				}				
			})			
			if(atLeastTwoVisible) $accordion.equalHeightColumns('.tgl-panel');			
		}
	}
})(jQuery);


$(masterStructure).on("Framework:pageLoaded#m2-1", function(){
	var $accordion = $(".accordion");
	$accordion.equalHeightColumns('summary');	
	
	var handleInterval;	
	$('details').on('click',function(event){
		$tgl_panel = $(this).first('.tgl-panel');
		// wait for details to open and adjust panel height if all opened
		var handleInterval = setInterval(function(){
				$tgl_panel.checkVisible(handleInterval,$accordion);
		},100);		
	});
	
});

$(window).resize(function(){
	var $accordion = $(".accordion");
	$accordion.equalHeightColumns('summary');	
	
	$('.tgl-panel').first().checkVisible(null,$accordion);
});