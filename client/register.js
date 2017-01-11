Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    /*

    */
  }
});

Template.register.onRendered(function(){
  $(".reveal").mousedown(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'text'));
  })
  .mouseup(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  })
  .mouseout(function() {
    $(".pwd").replaceWith($('.pwd').clone().attr('type', 'password'));
  });
    var validator = $('.register').validate({
    submitHandler: function(event){
      var email = $('[name=email]').val();
      var password = $('[name=password]').val();
      Accounts.createUser({
        email: email,
        password: password
      }, function(error){
        if (error) {
          if(error.reason == "Email already exists."){
            validator.showErrors({
              email: "That email already belongs to a registered user."
            });
          }
        } else {
          Router.go("home"); //Redirect if user registration succeeds
        }
      });
    }
  });
  });
