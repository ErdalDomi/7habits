/**
* This is the code responsible for all routing within our website. We have used the iron:iron-router Meteor package
* which offers a great deal of options and complexity if one is inclined to have full control of how the data flows
* within the website. 
*/


/* Route definitions are mostly simple, having a URL and which template to load. Iron router loads the template that 
*  has the same name as the url by default. Otherwise one must specify which template to load, like for our '/' page.
*/
Router.route('/',{
  name: 'start',
  template: 'start'
});

/* The configuration to iron-router can be made here, like setting the main template to be loaded everytime or the
* loading template for when the client is waiting for data to be sent on the wire. Note that we haven't implemented
* a loading template, as that remains for further work.
*/
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

/* Most routes have very simple configuration because iron-router tries to simplify when possible. */ 
Router.route('/register');
Router.route('/login');

/* Here we see one of the routers features, onBeforeAction which specifies what actions will be taken
*  before rendereing the url template. In this case we check if the user has the right credentials 
* (is logged in) to access particular pages. If the user is not logged on, the router redirects.
*/
Router.route('/home',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in, proceed as normal
        } else { 
            Router.go("/");// not logged-in
        }
    }	
});

Router.route('/about');
Router.route('/proactivity',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in
        } else {
            Router.go("/"); // not logged-in
        }
    }	
});
Router.route('/mission',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in
        } else {
            Router.go("/"); // not logged-in
        }
    }	
});
Router.route('/timetable',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in
        } else {
            this.render("start"); // not logged-in
        }
    }
});
