$(document).ready(function() {

	$(".answer__item").click(function(event) {
		const isCorrect = $(this).text().includes("Lightning");
		if (isCorrect) {
			$(this).addClass("answer__item--correct");
		} else {
			$(this).addClass("answer__item--incorrect");
			$(".answer__item").first().addClass("answer__item--correct");
		}
	});

});
