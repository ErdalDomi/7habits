Template.proactivity.helpers({
  days : function(){
    return ProgressList.find({}).fetch();
  }
});

Template.proactivity.events({
    'click .advance': function(event){
        $('.proactivityPrompt').stop().animate({
          'opacity' : '1'
        }, 500);
        $('.advance').hide();

        var doc = ProgressList.findOne({class:'current'});

        ProgressList.update({_id:doc._id}, {$set:{class:'completed'}});
        ProgressList.update({_id:"88TiHgWpKxLH4yivK"},{$set:{class:'current'}});

    }
});

Template.proactivity.onRendered(function(){
    ProgressList.update({_id:"P5XksqRkfztk3KBDZ"},{$set:{class:'current'}});
    ProgressList.update({_id:"88TiHgWpKxLH4yivK"},{$set:{class:'none'}});
    console.log(ProgressList.find({}).fetch());
    $('.proactivityPrompt').css('opacity','0');
})