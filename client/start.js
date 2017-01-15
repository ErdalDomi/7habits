Template.start.events({
  'submit form': function(event){
    event.preventDefault();
    /*

    */
  }
});



Template.start.onRendered(function(){

  $(".reveal").mousedown(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'email'));
  }).mouseup(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  }).mouseout(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  });
  var validator = $('.login').validate({
    submitHandler: function(event){
      console.log("inside login handler");
      var email = $('[name=login-email]').val();
      var password = $('[name=login-password]').val();
      console.log("retrieved : "+ email + " and " + password);
      Meteor.loginWithPassword(email,password, function(error){
        console.log("login with pass");
        if (error) {
          console.log("error");
          console.log(error);
          if (error.reason == "User not found") {
            console.log("user not found error");
            validator.showErrors({
              'login-email': "That email doesn't belong to a registered user."
            });
            console.log("shit");
          }
          if (error.reason == "Incorrect password") {
            validator.showErrors({
              'login-password': "You entered an incorrect password."
            });
          }

        } else {
          var currentRoute = Router.current().route.getName();
          if (currentRoute == "start") {
            $("#loginModal").modal("hide");
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            Router.go("home");
          }
        }
      });
    }
  });
  var registerValidator = $('.register').validate({
    submitHandler: function(event){
      var email = $('[name=register-email]').val();
      var password = $('[name=register-password]').val();
      Accounts.createUser({
        email: email,
        password: password
      }, function(error){
        if (error) {
          if(error.reason == "Email already exists."){
            registerValidator.showErrors({
              'register-email': "That email already belongs to a registered user."
            });
          }
        } else {
          $("#registerModal").modal("hide");
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          Router.go("home"); //Redirect if user registration succeeds
        }
      });
    }
  });
});

