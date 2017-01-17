/*In case of any events in the mission template, this code fires up.
* Concretly, whenever the user types a key, it gets the value of the
* text area and the ID of the user and it finds the mission statement
* for that user. Then it proceeds to update it.*/

Template.mission.events({
	'keyup [name=txtarea]' : function(event){
    	var missionText = $(event.target).val();
    	var currentUser = Meteor.userId();
    	var missionId = MissionsList.findOne({missionUser:currentUser})._id;
    	MissionsList.update({_id: missionId}, {$set:{text: missionText}});
	},
});

/*This is the text returned to the textarea from the database for the current user*/
Template.mission.helpers({
	text : function(){
		return MissionsList.findOne({missionUser: Meteor.userId()}).text;
	},
});

/*This small mechanism is responsible for iterating through the mission prompts.
* The duration the prompts stay on the screen can be tweaked on the second argument.*/
count = 0;
Template.mission.onRendered(function(){
	var timerID = setInterval(function() {
		var array = MissionPrompts.find().fetch();
		count++;
	    $('.prompt').html(array[count%array.length].prompt);
	}, 3 * 1000); 	
});