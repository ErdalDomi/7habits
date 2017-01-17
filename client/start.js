/*The form submission validation is performed by the login validator.
* this is a jquery library that offers the functionality. That's why
* we simply prevent the form from submitting and handle the validation
* in the onRendered template.
*/
Template.start.events({
  'submit form': function(event){
    event.preventDefault();

  }
});


/*Creating an account is a sensitive thing that's why we use Meteor's
* own functions to handle the user registration and log-in.
* When the user logs in or register, they're redirected to the home page */
Template.start.onRendered(function(){
/*Making password visible when clicking the 'spy' button*/
  $(".reveal").mousedown(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'email'));
  }).mouseup(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  }).mouseout(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  });
  var validator = $('.login').validate({
    submitHandler: function(event){

      var email = $('[name=login-email]').val();
      var password = $('[name=login-password]').val();

      Meteor.loginWithPassword(email,password, function(error){

        if (error) {

          if (error.reason == "User not found") {

            validator.showErrors({
              'login-email': "That email doesn't belong to a registered user."
            });

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
/*This part of the code is responsible for setting up the initial data the users will find in their accounts.
* Namely, the progress will be zeroed, a placeholder will appeare in the textarea mission statement, 
* and all the roles and goals will be defaulted to an empty value.*/
  settingUpAccount = function(){
    var currentUser = Meteor.userId();
    if(ProgressList.findOne({listUser: currentUser})==null){
      for (var i = 1; i <=30; i++) {
        if(i==1){
          ProgressList.insert({listUser: currentUser,class: "current", day: i});
        }else{
          ProgressList.insert({listUser: currentUser,class: "none", day: i});
        }        
      }
    }
    if(MissionsList.findOne({missionUser: currentUser})==null){
      MissionsList.insert({missionUser: currentUser, text: 'Write your mission statement...'});
    }
    if(Goals.findOne({goalUser: currentUser})==null){
      for(var i =1; i<=5; i++){
        for(var j=1; j<=4; j++){
          Goals.insert({goalUser: currentUser,name:"", number:j, goal:i});
        }        
      }      
    } 
    if(Roles.findOne({roleUser: currentUser})==null){
      for(var i =1; i<=5; i++){
        Roles.insert({roleUser: currentUser,name:"", number: i});
      }
    }    
  }

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
          settingUpAccount();
          $("#registerModal").modal("hide");
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
          Router.go("home"); //Redirect if user registration succeeds
        }
      });
    }
  });
});

