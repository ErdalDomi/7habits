Template.proactivity.helpers({
  days : function(){
    return ProgressList.find({}).fetch();
  }
});

/* When the user completes all 30 days the 'advance' button will be replaced by text */
Template.proactivityQuote.helpers({
  finished : function(){
    var currentUser = Meteor.userId();
    var currentId = ProgressList.findOne({listUser:currentUser, class:'current'})._id;
    var currentDay = ProgressList.findOne({_id:currentId}).day;
    if(currentDay==30){
        return true;
    } else{
        return false;
    }
  }
});

/* In this part we'd like to implement a quick mechanism that will allow users only one 'advance'
*  per day, reset each night at midnight and the option to restart their challenge. 
*  The way user advances through the checklist is by finding the day with the 'current' class
*  and promoting it to a completed class. Then it finds the next day and sets that as current.
*/ 
Template.proactivity.events({
    'click .advance': function(event){
        $('.proactivityPrompt').stop().animate({
          'opacity' : '1'
        }, 500);
        $('.proactivityExplain').stop().animate({
          'opacity' : '1'
        }, 800);
        $('.advance').hide();

        var currentUser = Meteor.userId();
        var currentId = ProgressList.findOne({listUser:currentUser, class:'current'})._id;
        var currentDay = ProgressList.findOne({_id:currentId}).day;
        ProgressList.update({_id:currentId}, {$set:{class:'completed'}});
        var nextId = ProgressList.findOne({day:currentDay+1})._id;
        ProgressList.update({_id:nextId},{$set:{class:'current'}});
    }
});

/* This piece of code hides the prompts when the page renders */
Template.proactivity.onRendered(function(){
    $('.proactivityPrompt').css('opacity','0');
    $('.proactivityExplain').css('opacity','0');
})