function ucwords(str) {
	return (str + '')
	.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
		return $1.toUpperCase();
	});
}

var wrapperResize = function() {
	var h = window.innerHeight;
	var x = Math.round(h * 0.75);

	var el1 = $('div#intro-wrapper');
	var el2 = $('div#survey-wrapper');
	var el3 = $('div#survey-form-wrapper');

	var el1Height = el1.innerHeight();
	var el2Height = el2.innerHeight();
	var el3Height = el3.innerHeight();

	if (el1Height > x) {
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
	// "click .nav-right-toggle": function(e, t) {
	// 	document.querySelector('.off-screen-nav').classList.add('show');
	// },
	"click .dropdown-menu": function(e, t) {
		$('.dropdown').toggleClass("open");
	},
	'click #first-ld-link': function(e, t) {
		$('html,body').animate({
			scrollTop: $("#survey-wrapper").offset().top - 46
		}, 'slow');
		e.preventDefault();
	}
});

Template.offScreenNav.events({
	"click .close": function(e, t) {
		document.querySelector('.off-screen-nav').classList.remove('show');
	},
	"click a": function(e, t) {
		var x = $('.off-screen-nav');

		if (x.hasClass('show')) {
			x.removeClass('show');
		}
	}
});

Template.homeWrapper.events({
	'click #first-ld-btn': function(e, t) {
		$('html,body').animate({
			scrollTop: $("#survey-wrapper").offset().top - 46
		}, 'slow');
	},
	'click #second-ld-btn': function(e, t) {
		$('html,body').animate({
			scrollTop: $("#survey-form-wrapper").offset().top - 46
		}, 'slow');
	},
	'submit #transition-survey-form': function(e, t) {
		e.preventDefault();
	},
	'click button.form-submit': function(e, t) {
		$('#transition-survey-form').formValidation({
			framework: 'bootstrap',
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			err: {
				// You can set it to popover
				container: 'tooltip'
			},
			fields: {
				name: {
					validators: {
						notEmpty: {
							message: 'The name is required'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'The email address is required'
						},
						emailAddress: {
							message: 'The input is not a valid email address'
						}
					}
				},
				branch: {
					validators: {
						notEmpty: {
							message: 'The service branch is required'
						}
					}
				},
				designator: {
					validators: {
						notEmpty: {
							message: 'The designator is required'
						}
					}
				},
				paygrade: {
					validators: {
						notEmpty: {
							message: 'The paygrade is required'
						}
					}
				},
				separate: {
					trigger: 'blur',
					validators: {
						notEmpty: {
							message: 'The date of separated is required'
						},
						date: {
							format: 'MM/DD/YYYY',
							message: 'The date of separated is not valid'
						}
					}
				},
				sector: {
					validators: {
						notEmpty: {
							message: 'The job sector is required'
						}
					}
				},
				position: {
					validators: {
						notEmpty: {
							message: 'The job title/position is required'
						}
					}
				}
			}
		})
		.on('success.form.fv', function(e) {
			// The e parameter is same as one
			// in the prevalidate.form.fv event above
			var data = {
				name: ucwords($('#set-one input[name="name"]').val()),
				email: $('#set-one input[name="email"]').val(),
				questions: [
					{
						qid: 'question-01',
						answer: {
							branch: ucwords($('#set-one input[name="branch"]').val()),
							designator: $('#set-one input[name="designator"]').val(),
							paygrade: $('#set-one input[name="paygrade"]').val()
						}
					},
					{
						qid: 'question-02',
						answer: $('#set-one input[name="separate"]').val()
					},
					{
						qid: 'question-03',
						answer: $('#set-one select[name="sector"]').val()
					},
					{
						qid: 'question-04',
						answer: ucwords($('#set-one input[name="position"]').val())
					}
				],
				created: new Date()
			};

			if ($('#set-two').css('display') != 'none') {
				for (var x = 5; x < 20; x++) {
					if (x < 10) {
						x = '0' + x;
					}

					if ($.trim($('#set-two #question-'+x).val()) != '') {
						var o = {
							qid: 'question-'+x,
							answer: $('#set-two #question-'+x).val()
						}

						data.questions.push(o);
					}
				}
			}

			Meteor.call('addSurvey', data, function(err, res) {
				window.location.href = '/thank-you';
			});
		});
	}
});

Template.hSurveyFormSet1.events({
	'click #form-do-more': function(e, t) {
		var x = $('#transition-survey-form').formValidation({
			framework: 'bootstrap',
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			err: {
				// You can set it to popover
				// The message then will be shown in Bootstrap popover
				container: 'tooltip'
			},
			fields: {
				name: {
					validators: {
						notEmpty: {
							message: 'The name is required'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'The email address is required'
						},
						emailAddress: {
							message: 'The input is not a valid email address'
						}
					}
				},
				branch: {
					validators: {
						notEmpty: {
							message: 'The service branch is required'
						}
					}
				},
				designator: {
					validators: {
						notEmpty: {
							message: 'The designator is required'
						}
					}
				},
				paygrade: {
					validators: {
						notEmpty: {
							message: 'The paygrade is required'
						}
					}
				},
				separate: {
					validators: {
						notEmpty: {
							message: 'The date of separated is required'
						}
					}
				},
				sector: {
					validators: {
						notEmpty: {
							message: 'The job sector is required'
						}
					}
				},
				position: {
					validators: {
						notEmpty: {
							message: 'The job title/position is required'
						}
					}
				}
			}
		})
		.on('success.form.fv', function(e) {
			$('#transition-survey-form #set-one').css('display', 'none');
			$('#transition-survey-form #set-two').css('display', 'block');

			$('#transition-survey-form #set-two button')
			.attr('disabled', false)
			.removeClass('disabled');
		})
		.formValidation('validate');
	},

});

Template.contactWrapper.events({
	'submit #contact-form': function(e) {
		e.preventDefault();

		$('#contact-form').formValidation({
			framework: 'bootstrap',
			icon: {
				valid: 'glyphicon glyphicon-ok',
				invalid: 'glyphicon glyphicon-remove',
				validating: 'glyphicon glyphicon-refresh'
			},
			err: {
				container: 'tooltip'
			},
			fields: {
				name: {
					validators: {
						notEmpty: {
							message: 'The name is required'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'The email address is required'
						},
						emailAddress: {
							message: 'The input is not a valid email address'
						}
					}
				},
				subject: {
					validators: {
						notEmpty: {
							message: 'The subject is required'
						}
					}
				},
				message: {
					validators: {
						notEmpty: {
							message: 'The message is required'
						}
					}
				}
			}
		})
		.on('success.form.fv', function(e) {
			var self = $(this);

			self.find('button').attr('disabled', true);
			self.find('.loader').removeClass('hide');

			var formData = {
				name: ucwords(self.find('input[name="name"]').val()),
				email: self.find('input[name="email"]').val(),
				subject: self.find('input[name="subject"]').val(),
				message: self.find('textarea[name="message"]').val()
			};

			//get the captcha data
			var captchaData = grecaptcha.getResponse();

			Meteor.call('contactFormSubmission', formData, captchaData, function(error, res) {
				self.find('.loader').addClass('hide');

				if (error) {				
					self.find('.helper-block.captcha-errors').html('<p>'+res.message+'</p>');

					self.find('button').removeClass('disabled')
					.attr('disabled', false);

				} else if (res.status == 400) {
					self.find('.helper-block.captcha-errors').html('<p>'+res.message+'</p>');

					self.find('button').removeClass('disabled')
					.attr('disabled', false);

				} else if (res.status == 200) {
					self.find('.helper-block.success').html('<p>'+res.message+'</p>');
					window.setTimeout(function() {
						window.location.reload();
					}, 1000);
				} else {
					self.find('.helper-block.error').html('<p>'+res.message+'</p>');

					self.find('button').removeClass('disabled')
					.attr('disabled', false);
				}

				// reset the captcha
				grecaptcha.reset();
			});
		})
		.formValidation('validate');
	}
});

Template.hSurveyFormSet2.helpers({
	questions: [
		{
			qid: 'question-05',
			question: '5. Describe how you got to this job/position and what from your military experience set you up to be successful?'
		},
		{
			qid: 'question-06',
			question: '6. What were weaknesses from military experience that you had to overcome to be successful in this career?'
		},
		{
			qid: 'question-07',
			question: '7. Describe that initial transition process and where you found yourself stuck?'
		},
		{
			qid: 'question-08',
			question: '8. How did you overcome that obstacle?'
		},
		{
			qid: 'question-09',
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

Template.homeWrapper.rendered = function() {
	wrapperResize();

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
}

Template.hSurveyFormSet1.rendered = function() {
	$('.datepicker').datepicker();
}

var sPosition = window.pageYOffset; // should start at 0

Meteor.startup(function() {
	reCAPTCHA.config({
		publickey: '6LftoBUTAAAAAL1EZImkjQ5yATwIE33WtCa1wuKl'
	});

	// Create cross browser requestAnimationFrame method:
	window.requestAnimationFrame = window.requestAnimationFrame
	 || window.mozRequestAnimationFrame
	 || window.webkitRequestAnimationFrame
	 || window.msRequestAnimationFrame
	 || function(f){setTimeout(f, 1000/60)}

	function shrinkHeader(scrolltop) {
		var scrolltop = window.pageYOffset; // get number of pixels document has scrolled vertically 
		var el = $('nav.header-wrapper > .container');
		var el2 = $('.header-wrapper .navbar-brand img');
		var height = el.innerHeight();
		var height2 = el2.innerHeight();

		if (scrolltop > sPosition) {
			// scrolling downwards
			var min = scrolltop - sPosition;
			var h = height - min;

			if (h <= 46) {
				el.css('max-height', '46px');
				el2.css('max-height', '46px');
			} else {
				el.css('max-height', h + 'px');
				el2.css('max-height', h + 'px');
			}

		} else {
			// scrolling upwards
			var plus = sPosition - scrolltop;
			var h = height + plus;

			if (h >= 88) {
				el.css('max-height', '88px');
				el2.css('max-height', '88px');
			} else {
				el.css('max-height', h + 'px');
				el2.css('max-height', h + 'px');
			}
		}

		sPosition = scrolltop;
	}

	window.addEventListener('scroll', function(){ // on page scroll
		var offset = window.pageYOffset;

		if (sPosition > 0 && sPosition < 48) {
			requestAnimationFrame(function() {
				shrinkHeader();
			});
		} else if (offset <= 0) {
			var el = $('nav.header-wrapper > .container');
			var el2 = $('.header-wrapper .navbar-brand img');

			el.css('max-height', '88px');
			el2.css('max-height', '88px');

			sPosition = 0;
		} else {
			sPosition = window.pageYOffset;
		}
	}, false);

	window.addEventListener('mousewheel', function() {
		if (sPosition > 0 && sPosition < 48) {
			requestAnimationFrame(function() {
				shrinkHeader();
			});
		} else if (offset <= 0) {
			var el = $('nav.header-wrapper > .container');
			var el2 = $('.header-wrapper .navbar-brand img');

			el.css('max-height', '88px');
			el2.css('max-height', '88px');

			sPosition = 0;
		} else {
			sPosition = window.pageYOffset;
		}
	}, false);
});
