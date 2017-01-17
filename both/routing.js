Router.route('/',{
  name: 'start',
  template: 'start'
});
Router.configure({
  layoutTemplate: 'main',
  loadingTemplate: 'loading'
});

Router.route('/register');
Router.route('/login');
Router.route('/home',{
    onBeforeAction: function(){
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in
        } else {
            ///this.render("start"); // not logged-in
            Router.go("/");
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
        console.log("You triggered 'onBeforeAction' for 'timetable' route.");
        var currentUser = Meteor.userId();
        if(currentUser){
            this.next(); //user logged in
        } else {
            this.render("start"); // not logged-in
        }
    },

    data: function(){

    },
    onRun: function(){
        console.log("You triggered 'onRun' for 'listPage' route.");
        this.next();
    },
    onRerun: function(){
        console.log("You triggered 'onRerun' for 'listPage' route.");
    },

    onAfterAction: function(){
        console.log("You triggered 'onAfterAction' for 'listPage' route.");
    },
    onStop: function(){
        console.log("You triggered 'onStop' for 'listPage' route.");
    }	
});
