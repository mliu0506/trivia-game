var triviaQuestions = [{
	question: "Which character does ' <u> Josh Brolin </u> '  acting in the film?",
	answerList: ["Spider Man", "Iron Man", "Thor", "Thanos"],
	answer: 3
},{
	question: "Which character does ' <u> Tom Holland </u> ' acting in the film?",
	answerList: ["Spider Man", "Captain America", "Black Panther", "Hulk"],
	answer: 0
},{
	question: "Which character does ' <u> Chris Evans </u> '  acting in the film?",
	answerList: ["Captain America", "Doctor Strange", "Loki", "Groot"],
	answer: 0

},{
	question: "Which character does ' <u> Scarlett Johansson </u> '  acting in the film?",
	answerList: ["Shuri", "Mantis", "Wanda Maximoff", "Black Widow"],
	answer: 3
},{
	question: "Which character does ' <u> Tom Hiddleston </u> '  acting in the film?",
	answerList: ["Loki", "Heidall", "Collector", "Thor"],
	answer: 0
},{
	question: "Which character does ' <u> Robert Downey Jr. </u> '  acting in the film?",
	answerList: ["Spider Man", "Iron Man", "Thanos", "Hulk"],
	answer: 1
},{
	question: "Which character does ' <u> Mark Ruffalo </u> '  acting in the film?",
	answerList: ["Black Panther", "Iron Man", "Hulk", "Loki"],
	answer: 2
},{
	question: "Which character does ' <u> Chris Hemsworth </u> ' 	acting in the film?",
	answerList: ["Thanos", "Spider Man", "Thor", "Clint Barton"],
	answer: 2
},{
	question: "Which character does ' <u> Chadwick Boseman </u> '  acting in the film?",
	answerList: ["Hulk", "Black Panther", "Thor", "Thanos"],
	answer: 1
},{

	question: "Which character does ' <u> Vin Diesel </u> '  acting in the film?",
	answerList: ["Collector", "Shuri", "Groot", "Hulk"],
	answer: 2

}];
var search = ['thanos', 'spider man', 'captain america', 'black widow', 'loki', 'ironman+mkxlv', 'hulk', 'thor', 'black panther', 'baby groot'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect; var timeforscoreboard; var timefornewQuestion;
var messages = {
	correct: "Yes, that's correct!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "All done! Here is how well you did."
}

$('#gameStart').on('click', function(){
	reset();
	newGame();
});

$('#startOverBtn').on('click', function(){
	reset();
	newGame();
});

function newGame(){

	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h3>'+ triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div class="row col-12 justify-content-center lead">');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		clearInterval(timefornewQuestion);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down for each question (15sec)
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		clearInterval(timeforscoreboard);
		clearInterval(timefornewQuestion);

		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.answerList').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	//giphy api

	var giphyURL = "https://api.giphy.com/v1/gifs/search?q=mavel+avengers+infinity war+" + search[currentQuestion] + "&limit=1&rating=g&api_key=tEE54dfpoCukYKR0F8o9TF2XRjEvdx78"
	$.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
		var currentGif = giphy.data;
		$.each(currentGif, function(index,value){
		var embedGif = value.images.original.url;
		newGif = $('<img>');
		newGif.attr('src', embedGif);
		newGif.addClass('gifImg');
		$('#gif').html(newGif);
		});
	});

	
	
	
	
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		//Time for Score Board
		timeforscoreboard = setTimeout(scoreboard, 5000);
	} else{
		currentQuestion++;
		//Time for New Question
		timefornewQuestion = setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	clearInterval(time);
	clearInterval(timeforscoreboard);
	clearInterval(timefornewQuestion);


	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}

function reset() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	$('#currentQuestion').empty();
	$('.answerList').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	$('#startOverBtn').hide();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	answered = false;

	clearInterval(time);
	clearInterval(timeforscoreboard);
	clearInterval(timefornewQuestion);
	

}
