$(masterStructure).on("Framework:pageLoaded#m2-2-3", function(){

	var $accordion = $(".accordion");
	$accordion.equalHeightColumns('summary');	
	
	var handleInterval;
	$('details').on('click',function(){
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