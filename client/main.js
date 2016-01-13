var wrapperResize = function() {
	var h = window.innerHeight;
	var x = Math.round(h * 0.75);

	var el1 = $('div#intro-wrapper');
	var el2 = $('div#survey-wrapper');
	var el3 = $('div#survey-form-wrapper');

	var el1Height = el1.innerHeight();
	var el2Height = el2.innerHeight();
	var el3Height = el3.innerHeight();

	if (el1Height > h) {
		el1.css('height', el1Height + 'px');
	} else {
		el1.css('height', x + 'px');
	}

	if (el2Height > h) {
		// el2.css('height', el2Height + 'px');
		el2.css('height', h + 'px');
	} else {
		el2.css('height', h + 'px');
	}

	// if (el3Height > h) {
	// 	el3.css('height', el3Height + 'px');
	// } else {
	// 	el3.css('height', h + 'px');
	// }
}

Template.header.events({
	"click .nav-right-toggle": function(e, t) {
		document.querySelector('.off-screen-nav').classList.add('show');
	}
});

Template.offScreenNav.events({
	"click .close": function(e, t) {
		document.querySelector('.off-screen-nav').classList.remove('show');
	}
});

Template.hSurveyFormSet2.helpers({
	questions: [
		{
			qid: 'question-5',
			question: '5. Describe how you got to this job/position and what from your military experience set you up to be successful?'
		},
		{
			qid: 'question-6',
			question: '6. What were weaknesses from military experience that you had to overcome to be successful in this career?'
		},
		{
			qid: 'question-7',
			question: '7. Describe that initial transition process and where you found yourself stuck?'
		},
		{
			qid: 'question-8',
			question: '8. How did you overcome that obstacle?'
		},
		{
			qid: 'question-9',
			question: '9. How did you find your passion?'
		},
		{
			qid: 'question-10',
			question: '10. What is your future path?'
		},
		{
			qid: 'question-11',
			question: '11. Do you have a mentor and if so, how did you plug into your career professional network?'
		},
		{
			qid: 'question-12',
			question: '12. Did your social networks help you find your job?'
		},
		{
			qid: 'question-13',
			question: '13. How did you sustain yourself financially in the short term while you transitioned?'
		},
		{
			qid: 'question-14',
			question: '14. Are you willing to write an article on your experience to share with other veterans?'
		},
		{
			qid: 'question-15',
			question: '15. If not, are you willing to do a 3 minute video?'
		},
		{
			qid: 'question-16',
			question: '16. Are you willing to provide your information to assist other veterans following your path in the future?'
		},
		{
			qid: 'question-17',
			question: '17. When you separated, what degrees or vocational training did you have?'
		},
		{
			qid: 'question-18',
			question: '18. Was this education and training a prerequisite for the job you now have?'
		},
		{
			qid: 'question-19',
			question: '19. Can you name one or two friends in your industry that have success stories that might be willing to share their story?'
		}
	]
});

Template.homeWrapper.events({
	'click #first-ld-btn': function(e, t) {
		$('html,body').animate({
			scrollTop: $("#survey-wrapper").offset().top
		}, 'slow');
	},
	'click #second-ld-btn': function(e, t) {
		$('html,body').animate({
			scrollTop: $("#survey-form-wrapper").offset().top
		}, 'slow');
	}
});

Template.homeWrapper.rendered = function() {
	wrapperResize();
}

Template.hSurveyFormSet1.rendered = function() {
	$('.datepicker').datepicker();
}

if (Meteor.isClient) {
	Meteor.startup(function() {
		$(window).resize(function(evt) {
			wrapperResize();
		});

		// Create cross browser requestAnimationFrame method:
		window.requestAnimationFrame = window.requestAnimationFrame
		 || window.mozRequestAnimationFrame
		 || window.webkitRequestAnimationFrame
		 || window.msRequestAnimationFrame
		 || function(f){setTimeout(f, 1000/60)}
		 
		var ggBg1 = document.querySelector('#survey-wrapper .scroll-p');

		function parallaxImg() {
			var scrolltop = window.pageYOffset; // get number of pixels document has scrolled vertically 
			
			ggBg1.style.top = -scrolltop * .2 + 'px'; // move img at 20% of scroll rate
			ggBg1.style.backgroundPosition = 'center ' + scrolltop * .3 + 'px';
		}

		window.addEventListener('scroll', function(){ // on page scroll
			requestAnimationFrame(parallaxImg); // call parallaxImg() on next available screen paint
		}, false);

		window.addEventListener('mousewheel', function() {
			requestAnimationFrame(parallaxImg);
		}, false);
	});
}
