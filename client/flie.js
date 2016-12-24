
  Session.set('notstarted', true);

  Template.body.helpers({
    'notstarted': function(){
      return Session.get('notstarted');
    }
  });

  Template.start.events({
    "click .startbtn": function(){
      Session.set('notstarted', !Session.get('notstarted'));
    }
  });

  Template.quotes.helpers({
    'quote': function(){
      var array = QuotesList.find().fetch();
      var quoteArray = [];
      var numberOfQuotes = 3;
      for(var i = 0; i < numberOfQuotes; i++){
        var randomIndex = Math.floor( Math.random() * array.length);
        quoteArray[i] = array[randomIndex];
      }
      return quoteArray;
    },
  });

  Template.signup.events({
    'submit form': function(event) {
      event.preventDefault();
      var emailVar = event.target.signupEmail.value;
      var passwordVar = event.target.signupPassword.value;
      Accounts.createUser({
        email: emailVar,
        password: passwordVar
      });
    }
  });

  Template.login.events({
    'submit form': function(event) {
      event.preventDefault();
      var emailVar = event.target.loginEmail.value;
      var passwordVar = event.target.loginPassword.value;
      Meteor.loginWithPassword(emailVar, passwordVar);
    }
  });
  /*Template.settings.events({
    'click .logout': function(event) {
      event.preventDefault();
      Meteor.logout();
    }
  });*/
