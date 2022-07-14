$(document).ready(function() {

	$.getJSON("https://raw.githubusercontent.com/IXIXIYIYIXIXI/quizdown/main/topics/pjo.json", function(json) {
		let questions = json["questions"];
		shuffleArray(questions);
		questions = questions.slice(0, 7);
		for (const question of questions) {
			const answers = question["answers"];
			question["correct"] = answers[question["correct"]];
			shuffleArray(answers);
		}
		console.log(questions);
	});

	$(".answer__item").click(function(event) {
		const isSelectable = !$(".answers").hasClass("answers--not_selectable");
		const isCorrect = $(this).text().includes("Lightning");

		if (isSelectable) {
			if (isCorrect) {
				$(this).addClass("answer__item--correct");
			} else {
				$(this).addClass("answer__item--incorrect");
				$(".answer__item").first().addClass("answer__item--correct");
			}
			$(".answers").addClass("answers--not_selectable");
		}
	});

	$("#start-button").click(function(event) {
		const questionFadeTime = 300;
		const beforeAnswerDelay = 1500;
		const answerFadeTime = 300;
		const answerDelay = 90;

		$(this).remove();
		$(".question").fadeIn(questionFadeTime, function() {
			const answer_items = $(".answer__item");
			answer_items.each(function(index) {
				$(this).delay(beforeAnswerDelay + answerDelay * index).fadeIn(answerFadeTime, function() {
					if (index == answer_items.length - 1) {
						$(".answers").removeClass("answers--not_selectable");
					}
				});
			});
		});
	});

});
