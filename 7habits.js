QuotesList = new Mongo.Collection('quotes');

if(Meteor.isClient){

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
}


if(Meteor.isServer){
  //create JSON file and import from there -- later
  if(QuotesList.find().count() === 0){
    QuotesList.insert({saying: "It is in the ordinary events of every day that we develop the proactive capacity to handle the extraordinary pressures of life. It’s how we make and keep commitments, how we handle a traffic jam, how we respond to an irate customer or a disobedient child. It’s how we view our problems and where we focus our energies. It’s the language we use.",
    author: "Habit 1: Be Proactive"});
    QuotesList.insert({saying: "It is the ability to choose which makes us human.",
    author: "Madeleine L'Engle - Habit 1: Be Proactive"});
    QuotesList.insert({saying: "How would today be different if you believed and acted on the idea that you can live out of your imagination instead of out your memory?",
    author: "Habit 2: Begin With the End in Mind"});
    QuotesList.insert({saying: "What changes could you make to your schedule today that would allow you to focus on the important rather then the urgent?",
    author: "Habit 3: Put First Things First"});
    QuotesList.insert({saying: "What are your Big Rocks for this week—the things you need to do to accomplish what is most important to you?",
    author: "Habit 3: Put First Things First"});
    QuotesList.insert({saying: "It is in the ordinary events of every day that we develop the proactive capacity to handle the extraordinary pressures of life. It’s how we make and keep commitments, how we handle a traffic jam, how we respond to an irate customer or a disobedient child. It’s how we view our problems and where we focus our energies. It’s the language we use.",
    author: "Habit 1: Be Proactive"});
    QuotesList.insert({saying: "Your planning tool should be your servant, never your master. Since it has to work for you, it should be tailored to your style, your needs, your particular ways.",
    author: "Habit 3: Put First Things First"});
    QuotesList.insert({saying: "Understand your ultimate destination. Begin today with the image of the end of your life as your frame of reference by which everything else is examined. Each day will then contribute to the vision you have of your life as a whole.",
    author: "Habit 2: Begin with the End in Mind"});
    QuotesList.insert({saying: "Wisdom is your perspective on life, your sense of balance, your understanding of how the various parts and principles apply and relate to each other. It embraces judgment, discernment, comprehension; It is a gestalt or oneness, an integrated wholeness.",
    author: "Habit 2: Begin with the End in Mind"});
  }
}
