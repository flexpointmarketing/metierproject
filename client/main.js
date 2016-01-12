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
			question: '5. Describe how you got to this job/position and what from your military experience set you up to be successful?'
		},
		{
			question: '6. What were weaknesses from military experience that you had to overcome to be successful in this career?'
		},
		{
			question: '7. Describe that initial transition process and where you found yourself stuck?'
		},
		{
			question: '8. How did you overcome that obstacle?'
		},
		{
			question: '9. How did you find your passion?'
		},
		{
			question: '10. What is your future path?'
		},
		{
			question: '11. Do you have a mentor and if so, how did you plug into your career professional network?'
		},
		{
			question: '12. Did your social networks help you find your job?'
		},
		{
			question: '13. How did you sustain yourself financially in the short term while you transitioned?'
		},
		{
			question: '14. Are you willing to write an article on your experience to share with other veterans?'
		},
		{
			question: '15. If not, are you willing to do a 3 minute video?'
		},
		{
			question: '16. Are you willing to provide your information to assist other veterans following your path in the future?'
		},
		{
			question: '17. When you separated, what degrees or vocational training did you have?'
		},
		{
			question: '18. Was this education and training a prerequisite for the job you now have?'
		},
		{
			question: '19. Can you name one or two friends in your industry that have success stories that might be willing to share their story?'
		}
	]
});

if (Meteor.isClient) {
	Meteor.startup(function() {
		
	});
}
