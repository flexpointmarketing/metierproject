Template.header.events({
	"click .nav-right-toggle": function(e, t) {
		document.querySelector('.off-screen-nav').classList.add('show');
	}
});

if (Meteor.isClient) {
	Meteor.startup(function() {
		
	});
}
