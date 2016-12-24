Template.start.events({
  "click .startbtn": function(){
    Session.set('notstarted', !Session.get('notstarted'));
  }
});
