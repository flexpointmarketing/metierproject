Router.configure({
	layoutTemplate: 'generalAppLayout'
});

Router.route('/', function () {
	// use the template named generalAppLayout for our layout
	// this.layout('generalAppLayout');

	// render the header template into the yield region named "header" 
	// {{> yield "header"}}
	this.render('header', { to: 'header' });

	// render the header template into the yield region named "aside" 
	// {{> yield "aside"}}
	this.render('offScreenNav', { to: 'aside' });

	// render the home template into the "main" region
	// {{> yield}}
	this.render('homeWrapper');

	// render the footer template into the yield region named "footer" 
	// {{> yield "footer"}}
	this.render('footer', { to: 'footer' });
});

Router.route('/about-us', function () {
	this.render('header', { to: 'header' });
	this.render('offScreenNav', { to: 'aside' });
	this.render('aboutWrapper');
	this.render('footer', { to: 'footer' });
});

Router.route('/contact-us', function () {
	this.render('header', { to: 'header' });
	this.render('offScreenNav', { to: 'aside' });
	this.render('contactWrapper');
	this.render('footer', { to: 'footer' });
});

Router.route('/thank-you', function () {
	this.render('header', { to: 'header' });
	this.render('offScreenNav', { to: 'aside' });
	this.render('thankYou');
	this.render('footer', { to: 'footer' });
});