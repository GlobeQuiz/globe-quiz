//git controlled version
$( document ).ready(function() {

answerkey = [1,3];
yourAnswers = [];
activeQuestion = 0;
numRight = 0;
answerString = "the correct answers were ";
yourString = "your answers were ";
didAnswer = false;
    
$('.quiz__answer').click(function(){
didAnswer = true;
$('.quiz__next').html('next question');
if ($(this).parent().hasClass('disabled')){
	console.log('already answered');
} else {
	console.log("you clicked on "+ ($(this).index()+1));
console.log ("we're looking for "+answerkey[activeQuestion]);
yourAnswers[activeQuestion]= ($(this).index()+1);
$(".quiz__summary").removeClass('quiz__summary--hidden');
if (($(this).index()+1) == answerkey[activeQuestion]) {
	numRight++;
	$('.quiz__progress').html(numRight+'/2 correct');
}
$(this).parent().addClass('disabled');
}

});

$('.quiz__next').click(function(){
	if (!didAnswer) {
		yourAnswers[activeQuestion] = 0;
	}
	console.log("going next");
	activeQuestion++;
	quizObject.initQuestion(activeQuestion);
});


quiz = (function(){
quizObject = {};

quizObject.init = function(){
console.log( "ready!" );
};

quizObject.initQuestion = function(newQuestion){
	didAnswer=false;
	if (newQuestion <answerkey.length){
		$('.quiz__body').addClass('hide');
		$('.quiz__next').html('skip this question');
		$('.quiz__body:nth-child('+(newQuestion+2)+')').removeClass('hide');
		console.log("activating "+newQuestion);
	} else {
		console.log('final screen');
		$('.finalScreen').removeClass('hide');
		$('.quiz__next').addClass('hide');
		$('.quiz__body').addClass('hide');
		$.each(answerkey, function(index, val) {
   			answerString += (val+", ");
		});
		$.each(yourAnswers, function(index, val) {
   			yourString += (val+", ");
		});
		$('.quiz-answers').html(answerString);
		$('.your-answers').html(yourString);
	}
}


return quizObject;
}());

quizObject.init();
//quizObject.initQuestion();

});