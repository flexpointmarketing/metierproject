/* Server Javascript Only */

Survey = new Mongo.Collection("survey");

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
});

Meteor.methods({
	addSurvey: function (data) {
		Survey.insert(data);
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