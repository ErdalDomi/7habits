Template.home.onRendered(function(){
  "use strict";
  Meteor.setTimeout(function (){
    var s = new Snap(800, 600);
    var rect = s.rect(20,20,40,40);
    var circle = s.circle(60,150,50);
    var move = function(dx,dy) {
        this.attr({
                    transform: this.data('origTransform') + (this.data('origTransform') ? "T" : "t") + [dx, dy]
                });
              }

              var start = function() {
        this.data('origTransform', this.transform().local );
      }
      var stop = function() {
        console.log('finished dragging');
      }

      rect.drag(move, start, stop );
      circle.drag(move, start, stop );
  }, 1000);
/*  Meteor.setTimeout(function (){
    var s = new Snap(800, 600),
    r = s.rect(100,100,100,100,20,20).attr({ stroke: '#123456', 'strokeWidth': 20, fill: 'red', 'opacity': 0.2 }),

    t = s.text(100,50,'Snap("#svg") should reference an svg element, not a div. Or create it by supplying width,height Snap(100,100)');
  }, 1000);

  */
});
