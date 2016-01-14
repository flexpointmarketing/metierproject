/* Server Javascript Only */

Survey = new Mongo.Collection("survey");

Meteor.methods({
	addSurvey: function (data) {
		Survey.insert(data);
	}
})