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

if (Meteor.isClient) {
	Meteor.startup(function() {
		
	});
}
