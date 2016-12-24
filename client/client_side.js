
Session.set('notstarted', true);
console.log("session is now : "+ Session.get('notstarted'));

  $.validator.setDefaults({
    rules: {
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        }
    },
    messages: {
        email: {
            required: "You must enter an email address.",
            email: "You've entered an invalid email address."
        },
        password: {
            required: "You must enter a password.",
            minlength: "Your password must be at least {0} characters."
        }
    }
  });


  Template.body.helpers({
    'notstarted': function(){
      console.log("body.helpers returns session: " + Session.get('notstarted'));
      return Session.get('notstarted');
    }
  });
