/* Server Javascript Only */

Survey = new Mongo.Collection("survey");

var qlookup = {};
var questionsSet = [
	{
		qid: 'question01',
		question: 'What was your Service Branch, Designator (AFSB, MOS, Rate) and Paygrade'
	},
	{
		qid: 'question02',
		question: 'When did you separate'
	},
	{
		qid: 'question03',
		question: 'What job sector do you work in now'
	},
	{
		qid: 'question04',
		question: 'What is your job title/position'
	},
	{
		qid: 'question05',
		question: 'Describe how you got to this job/position and what from your military experience set you up to be successful'
	},
	{
		qid: 'question06',
		question: 'What were weaknesses from military experience that you had to overcome to be successful in this career?'
	},
	{
		qid: 'question07',
		question: 'Describe that initial transition process and where you found yourself stuck'
	},
	{
		qid: 'question08',
		question: 'How did you overcome that obstacle'
	},
	{
		qid: 'question09',
		question: 'How did you find your passion'
	},
	{
		qid: 'question10',
		question: 'What is your future path'
	},
	{
		qid: 'question11',
		question: 'Do you have a mentor and if so, how did you plug into your career professional network'
	},
	{
		qid: 'question12',
		question: 'Did your social networks help you find your job'
	},
	{
		qid: 'question13',
		question: 'How did you sustain yourself financially in the short term while you transitioned'
	},
	{
		qid: 'question14',
		question: 'Are you willing to write an article on your experience to share with other veterans'
	},
	{
		qid: 'question15',
		question: 'If not, are you willing to do a 3 minute video'
	},
	{
		qid: 'question16',
		question: 'Are you willing to provide your information to assist other veterans following your path in the future'
	},
	{
		qid: 'question17',
		question: 'When you separated, what degrees or vocational training did you have'
	},
	{
		qid: 'question18',
		question: 'Was this education and training a prerequisite for the job you now have'
	},
	{
		qid: 'question19',
		question: 'Can you name one or two friends in your industry that have success stories that might be willing to share their story'
	}
];

Meteor.startup(function() {
	reCAPTCHA.config({
		privatekey: '6LftoBUTAAAAAEQrwVucJAOQ40LjSRMPZF3WdLKS'
	});

	var smtp = {
		username: 'metier@flexpointmarketing.com',
		password: 'PERGlobal007',
		server: 'flexpointmarketing.com',
		port: 465
	}

	process.env.MAIL_URL = 'smtp://' + smtp.username + ':' + smtp.password + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

	for (var i = 0, len = questionsSet.length; i < len; i++) {
		qlookup[questionsSet[i].qid] = questionsSet[i];
	}
});

Meteor.methods({
	addSurvey: function (data) {
		Survey.insert(data);

		console.log(data);

		var body = "<p><b>Name:</b> "+data.name+"</p>";
			body += "<p><b>Answered Questions:</b></p>";

		for (var x = 0, len = data.questions.length; x < len; x++) {
			body += '<div style="box-sizing: border-box; padding: 5px 15px; border: 1px solid #ccc; width: 97%; margin-bottom: 5px;">';
			body += '<p><b>QID:</b> '+data.questions[x].qid+'</p>';
			body += '<p><b>Question:</b> '+qlookup[data.questions[x].qid].question+'</p>';

			if (x == 0) {
				body += '<p><b>Answers:</b></p>';
				body += '<p>Service Branch: '+data.questions[x].answer.branch+'</p>';
				body += '<p>Designator: '+data.questions[x].answer.designator+'</p>';
				body += '<p>Paygrade: '+data.questions[x].answer.paygrade+'</p>';
			} else {
				body += '<p><b>Answer:</b> '+data.questions[x].answer+'</p>';
			}

			body += '</div>';
		}

		Email.send({
			to: 'paulg@flexpointmarketing.com',
			from: data.name + " <"+data.email+">",
			subject: 'Transition Survey - New Form Submission',
			html: body
		});
	},
	contactFormSubmission: function(formData, captchaData) {
		var returnData = {};

		var body = "<p><strong>Name:</strong> "+formData.name+"</p>";
			body += "<p><strong>Message:</strong> "+formData.message+"</p>";

		var verifyCaptchaResponse = reCAPTCHA.verifyCaptcha(this.connection.clientAddress, captchaData);

		if (!verifyCaptchaResponse.success) {
			// console.log('reCAPTCHA check failed!', verifyCaptchaResponse);
			// throw new Meteor.Error(422, 'reCAPTCHA Failed: ' + verifyCaptchaResponse.error);
			
			returnData.status = 400;
			returnData.message = "Captcha Error";
		} else {

			// Let other method calls from the same client start running,
			// without waiting for the email sending to complete.
			// this.unblock();

			Email.send({
				to: 'metier@flexpointmarketing.com',
				from: formData.email,
				subject: formData.subject,
				html: body
			});

			returnData.status = 200;
			returnData.message = "Successfully Submitted!";
		}

		return returnData;
	}
})