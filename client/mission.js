Template.mission.events({
	'keyup [name=txtarea]' : function(event){
    	var missionText = $(event.target).val();
    	var currentUser = Meteor.userId();
    	console.log("inside mission curr user: "+currentUser);
    	var missionId = MissionsList.findOne({missionUser:currentUser})._id;
    	console.log("the mission id is: " + missionId);
    	MissionsList.update({_id: missionId}, {$set:{text: missionText}});
	},
});

Template.mission.helpers({
	text : function(){
		return MissionsList.findOne({missionUser: Meteor.userId()}).text;
	},
});

count = 0;
Template.mission.onRendered(function(){
	var timerID = setInterval(function() {
		var array = MissionPrompts.find().fetch();
		count++;
	    $('.prompt').html(array[count%array.length].prompt);
	}, 3 * 1000); 	
});