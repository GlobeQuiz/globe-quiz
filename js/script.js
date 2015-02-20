//git controlled version
$( document ).ready(function() {

	answerkey = [1,1];
	yourAnswers = [];
	activeQuestion = 0;
	numRight = 0;
	answerString = "the correct answers were ";
	yourString = "your answers were ";
	didAnswer = false;
	timerCount = 20;
	
	$('.quiz__answer').click(function(){
		didAnswer = true;
		$('.quiz__next').html('Next Question &nbsp;&nbsp; &#8614;');
		if ($(this).parent().hasClass('disabled')){
			console.log('already answered');
		} else {
			quizObject.timer(0);
			$('.quiz__answer:nth-child('+answerkey[activeQuestion]+')').addClass('correct');
			console.log("you clicked on "+ ($(this).index()+1));
			console.log ("we're looking for "+answerkey[activeQuestion]);
			yourAnswers[activeQuestion]= ($(this).index()+1);
			if (($(this).index()+1) == answerkey[activeQuestion]) {
				numRight++;
				$('.quiz__progress').html(numRight+'/'+answerkey.length+' correct');
			} else {
				$('.quiz__answer:nth-child('+($(this).index()+1)+')').addClass('incorrect');
			}
			$(this).parent().addClass('disabled');
		}

	});




	$('.quiz__next').click(function(){
		if (!didAnswer) {
			yourAnswers[activeQuestion] = 0;
			quizObject.timer(20);
		}
		
		console.log("going next");
		activeQuestion++;
		quizObject.initQuestion(activeQuestion);
	});


	quiz = (function(){
		quizObject = {};

		quizObject.init = function(){
			console.log( "ready!" );
			quizObject.timer(timerCount);
		};

		quizObject.initQuestion = function(newQuestion){
			didAnswer=false;
			$('.quiz__answer-container').removeClass('disabled');
			$('.quiz__answer').removeClass('correct').removeClass('incorrect');
			if (newQuestion < answerkey.length) {
				quizObject.timer(0);
				quizObject.timer(timerCount);
				$('.quiz__body').addClass('hide');
				$('.quiz__next').html('Skip Question &nbsp;&nbsp; &#8614;');
				$('.quiz__body:nth-child('+(newQuestion + 1)+')').removeClass('hide');
				console.log("activating " + newQuestion);
			} else {
				quizObject.timer(0);
				console.log('final screen');
				$('.finalScreen').removeClass('hide');
				$('.quiz__watch').addClass('hide');
				$('.quiz__next').addClass('hide');
				$('.quiz__body').addClass('hide');
				$('.quiz__timer').addClass('hide');
				finalString = "";
				$.each(answerkey, function(index, val) {
					console.log('looping through'+index);
					offsetIndex= index+1;
					questionElement = $('.quiz__body:nth-child('+(offsetIndex)+') li:nth-child('+val+')');
					answerElement = $('.quiz__body:nth-child('+(offsetIndex)+') li:nth-child('+yourAnswers[index]+')');
					console.log (questionElement);
					console.log (answerElement);
					finalString += ("Question: "+offsetIndex+"</br>");
					finalString += ("the correct answer is: </br>"+ questionElement.html()+"</br>" );
					if (yourAnswers[index] == 0){
						finalString += " you skipped this question</br>";
					} else {
						finalString += ("you answered: </br>"+ answerElement.html()+"</br>" );
					}
					finalString += "</br>";
				});
				$('.finalScreen').html(finalString);
			}
		}
		quizObject.timer = function(timeLeft){
				if(typeof id !== "undefined"){
				  clearTimeout(id);
				}
			if (timeLeft > 0) {
				$('.quiz__timer').html(timeLeft+ " s");
				id = setInterval(function() {
					timeLeft--;
					if(timeLeft <= 0) {
						console.log(timeLeft);
						yourAnswers[activeQuestion] = 0;
						console.log('timeup');
						$('.quiz__timer').html('0 s');
			    		$('.quiz__next').html('Next Question &nbsp;&nbsp; &#8614;');
						clearInterval(id);
						$('.quiz__answer-container').addClass('disabled');
						return;
					} else {
						console.log(timeLeft);
						console.log('countdown');
						$('.quiz__timer').html(timeLeft+ " s");
					}
				}, 1000);
			} else {
				console.log ("stopping timer");
				//clearInterval(id);
			}

		};


		return quizObject;
	}());

quizObject.init();
//quizObject.initQuestion();

});