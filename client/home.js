Template.home.onRendered(function(){
  "use strict";
  Meteor.setTimeout(function (){
    var s = new Snap('#habit_circle');
    var bigCircle = s.circle(350, 350, 300);
    bigCircle.attr({
      fill: "#bada55",
      stroke: "#000",
      strokeWidth: 5
    });
  });

});
