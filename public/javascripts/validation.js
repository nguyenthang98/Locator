$(document).ready(function () {
	$('#addReview').submit(function (event) {
		$('.alert.alert-danger').hide();
		if(!$('input#name').val() || !$('select#rating').val() || !$('textarea#review').val()){
			if($('.alert.alert-danger').length){
				$('.alert.alert-danger').fadeIn(250);
			}else{
				$(this).prepend('<div role="alert" class="alert alert-danger">All fields required, please try again</div>')
			}
			return false;
		}
	});
	$('#get-new-review').attr('href', document.URL + '/reviews/new');
})