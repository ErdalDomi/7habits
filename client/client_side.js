/*This is what the client receives from the server. It specifies the data it needs.*/
Meteor.subscribe('quotes');
Meteor.subscribe('prompts');
Meteor.subscribe('progress');
Meteor.subscribe('missions');
Meteor.subscribe('goals');
Meteor.subscribe('roles');
Meteor.subscribe('events');
Meteor.subscribe('priorities');

/* This belongs to an external library for jquery validation of credentials.
*  We have implemented some of our own validation so not everything here is
*  used. 
*/
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
