
  Session.set('notstarted', true);

  Template.body.helpers({
    'notstarted': function(){
      return Session.get('notstarted');
    }
  });
