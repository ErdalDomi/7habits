Template.proactivity.helpers({
  days : function(){
    return ProgressList.find({}).fetch();
  }
});


Template.proactivityQuote.helpers({
  finished : function(){
    console.log("Inside finished and it returns:")
    var currentUser = Meteor.userId();
    console.log("Current user is: "+ currentUser);
    var currentId = ProgressList.findOne({listUser:currentUser, class:'current'})._id;
    console.log("Current day id is: "+ currentId);
    var currentDay = ProgressList.findOne({_id:currentId}).day;
    console.log("Current day is: " + currentDay);
    if(currentDay==30){
        return true;
    } else{
        return false;
    }
  }
});

Template.proactivity.events({
    'click .advance': function(event){

        console.log("Day ends in: " + moment().endOf('day').fromNow());

        console.log("It's 8pm?: " +(moment().endOf('day').fromNow() === "in 4 hours"));

        $('.proactivityPrompt').stop().animate({
          'opacity' : '1'
        }, 500);
        $('.proactivityExplain').stop().animate({
          'opacity' : '1'
        }, 800);
        $('.advance').hide();

        var currentUser = Meteor.userId();
        console.log("Current user is: "+ currentUser);
        var currentId = ProgressList.findOne({listUser:currentUser, class:'current'})._id;
        console.log("Current day id is: "+ currentId);
        var currentDay = ProgressList.findOne({_id:currentId}).day;
        console.log("Current day is: " + currentDay);
        ProgressList.update({_id:currentId}, {$set:{class:'completed'}});
        console.log("updated current day to completed");
        var nextId = ProgressList.findOne({day:currentDay+1})._id;
        console.log("Next day id: "+ nextId);
        ProgressList.update({_id:nextId},{$set:{class:'current'}});
    }
});

Template.proactivity.onRendered(function(){
    $('.proactivityPrompt').css('opacity','0');
    $('.proactivityExplain').css('opacity','0');
})