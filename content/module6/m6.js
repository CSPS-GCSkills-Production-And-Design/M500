//var qsObjParams = {"cheatMode":true,"debugMode":true}
function fQsEventDispatcher(evt, params) {
	if (evt === "activity_completed") {
		// passed exam
		if (params.activity_successfully_completed) {
			window.unlockPage('m7');
			if ($('.qs-item-failed').length > 0) {
				$('.qs-final-positive-feedback .recap').show();
			}
		}
		// failed exam
		else {
			$('.qs-final-negative-feedback .recap').show();
			//$('.qs-post-feedback').remove(); // remove feedbacks/answers               
		}


	} else if (evt === "activity_started") {
		$('#activity-1').addClass('col-md-8')
	}
}
