Meteor.publish('quotes', function(){
	console.log("publish quotes curr user " + this.userId);
	return QuotesList.find();
});

Meteor.publish('prompts', function(){
	return MissionPrompts.find();
});

Meteor.publish('progress', function(){
	var currentUser = this.userId;
	console.log("publish progress curr user " + currentUser);
	return ProgressList.find({listUser: currentUser});
});

Meteor.publish('missions',function(){
	var currentUser = this.userId;
	console.log("publishing mission list to "+currentUser);
	return MissionsList.find({missionUser: currentUser});
});

Meteor.publish('goals', function(){
	var currentUser = this.userId;
	return Goals.find({goalUser: currentUser});
});

Meteor.publish('roles', function(){
	var currentUser = this.userId;
	return Roles.find({roleUser: currentUser});
});

Meteor.publish('events', function(){
	var currentUser = this.userId;
	return Events.find({eventUser: currentUser});
});

Meteor.publish('priorities', function(){
	var currentUser = this.userId;
	console.log("publishing priorities list to "+currentUser);
	return Priorities.find({eventUser: currentUser});
});