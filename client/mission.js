
Template.mission.events({
	'keyup [name=txtarea]' : function(event){
    	var missionText = $(event.target).val();
    	MissionsList.update({_id:"g6c2fftohTmE6oBHA"}, {$set:{text: missionText}});
	},
});

Template.mission.helpers({
	text : function(){
		return MissionsList.findOne({_id:"g6c2fftohTmE6oBHA"}).text;
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