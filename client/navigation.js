/* Logging out is a simple as this with Meteor */

Template.navigation.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('start');
    }
});