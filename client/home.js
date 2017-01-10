Template.home.onRendered(function(){
  "use strict";
  Meteor.setTimeout(function (){
    //center of circle: 350,350
    var circleCenter = 350;
    var circleRadius = 300;
    var lighterGreen = "#CCFF99";
    var lightGreen = "#4D9900";
    var darkerGreen = "#53CF53";
    var darkestGreen = "#003300";
    var s = new Snap('#habit_circle');
    var bigCircle = s.circle(circleCenter, circleCenter, circleRadius);
     bigCircle.attr({
       fill: lighterGreen,
       stroke: lightGreen,
       strokeWidth: 3
     });

    //general rect attributes
    var RectX = 170;
    var RectWidth = 360;
    var RectHeight = 30;

    //top rectangle y positioning
    var topRectY = 110;
    //draw top rect
    var topRect = s.rect(RectX,topRectY,RectWidth,RectHeight).attr({fill:lightGreen});

    //top triangle attributes
    var topLeftXCorner = RectX+2;
    var topLeftYCorner = topRectY + RectHeight;
    var topRightXCorner = RectX + RectWidth-2;
    var topRightYCorner = topRectY + RectHeight;    
    var topDownXCorner = circleCenter ;
    var topDownYCorner = circleCenter - RectHeight/2;
    //draw top trig
    var topTrig = s.polygon(topLeftXCorner,topLeftYCorner,topRightXCorner,topRightYCorner,topDownXCorner,topDownYCorner).attr({stroke: lightGreen, fill: "#fff", strokeWidth: 2});
    //middle rect y positioning
    var middleRectY = circleCenter - RectHeight/2; 
    //draw middle rect
    var middleRect = s.rect(RectX,middleRectY,RectWidth,RectHeight).attr({fill:lightGreen, stroke:lightGreen, strokeWidth:2});
    //bottom rect y positioning
    var bottomRectY = 560;
    //draw bottom rect
    var bottomRect = s.rect(RectX,bottomRectY,RectWidth,RectHeight).attr({fill:lightGreen});;
    //bottom triangle attributes
    var bottomLeftXCorner = RectX;
    var bottomLeftYCorner = bottomRectY;
    var bottomRightXCorner = RectX + RectWidth;
    var bottomRightYCorner = bottomRectY;
    var bottomTopXCorner = circleCenter;
    var bottomTopYCorner = circleCenter + RectHeight/2;
    //draw bottom trig
    //var bottomTrig = s.polygon(bottomLeftXCorner,bottomLeftYCorner,bottomRightXCorner,bottomRightYCorner,bottomTopXCorner,bottomTopYCorner).attr({stroke: "#006600"});
    //top small trig
    var topSmallTrigTopX = circleCenter;
    var topSmallTrigTopY = topLeftYCorner;
    var topSmallTrigLeftX = circleCenter*3/4;
    var topSmallTrigLeftY = (topRectY+RectHeight + middleRectY)/2;
    var topSmallTrigRightX = circleCenter*5/4;
    var topSmallTrigRightY = topSmallTrigLeftY;
    //draw top small trig
    var topSmallTrig = s.polygon(topSmallTrigTopX,topSmallTrigTopY,topSmallTrigLeftX,topSmallTrigLeftY,topSmallTrigRightX,topSmallTrigRightY).attr({stroke:lightGreen, fill:"#fff", strokeWidth:2});
    //bottom small trig
    var bottomSmallTrigBottomX = circleCenter;
    var bottomSmallTrigBottomY = bottomRectY;
    var bottomSmallTrigLeftX = circleCenter*3/4;
    var bottomSmallTrigLeftY = (middleRectY+RectHeight + bottomRectY)/2-2;
    var bottomSmallTrigRightX = circleCenter*5/4+1;
    var bottomSmallTrigRightY = bottomSmallTrigLeftY;
    //draw bottom small trig
    var bottomSmallTrig = s.polygon(bottomSmallTrigBottomX,bottomSmallTrigBottomY,bottomSmallTrigLeftX,bottomSmallTrigLeftY,bottomSmallTrigRightX,bottomSmallTrigRightY).attr({stroke: "#006600", fill: "#fff"});
    //habits: 
    var habit1 = s.polygon(RectX+2,bottomRectY,bottomSmallTrigBottomX,bottomSmallTrigBottomY,bottomSmallTrigLeftX,bottomSmallTrigLeftY).attr({stroke: lightGreen, strokeWidth: 2,fill: "#fff"});
    var habit2 = s.polygon(circleCenter,bottomSmallTrigBottomY,RectX+RectWidth-2,bottomSmallTrigBottomY,bottomSmallTrigRightX,bottomSmallTrigRightY).attr({stroke: lightGreen, strokeWidth: 2,fill: "#fff"});
    var habit3 = s.polygon(bottomSmallTrigLeftX,bottomSmallTrigLeftY,bottomSmallTrigRightX,bottomSmallTrigRightY,bottomTopXCorner,bottomTopYCorner).attr({stroke: lightGreen, strokeWidth: 2,fill: "#fff"});
    //texts:
    var text1 = s.text(RectX + 120, topRectY+20, "INTERDEPENDENCE").attr({fill:"#fff"});
    var text2 = s.text(RectX + 130, middleRectY+20, "INDEPENDENCE").attr({fill:"#fff"});
    var text3 = s.text(RectX + 140, bottomRectY+20, "DEPENDENCE").attr({fill:"#fff"});
    var text4 = s.text(bottomSmallTrigLeftX + 42, bottomSmallTrigLeftY + 40, "Private \n Victory").attr({fill:darkestGreen});
    var text5 = s.text(bottomSmallTrigLeftX + 47, topSmallTrigLeftY - 30, "Public Victory").attr({fill:darkestGreen});
    var text6 = s.text(RectX+60,bottomRectY-30,"Proactivity").attr({fill:darkestGreen});
    var text7 = s.text(circleCenter+60,bottomRectY-30,"Mission").attr({fill:darkestGreen});
    var text8 = s.text(bottomSmallTrigLeftX+50,bottomSmallTrigLeftY-30,"First things").attr({fill:darkestGreen});
    var text9 = s.text(RectX+RectHeight+15,topRectY+65,"Understanding").attr({fill:darkestGreen});
    var text10 = s.text(RectX+RectHeight+205,topRectY+65,"Synergize").attr({fill:darkestGreen});
    var text11 = s.text(circleCenter-25, topRectY+170,"Win-Win").attr({fill:darkestGreen});
    //mouseovers and clicks
    habit1.click(function(){
      Router.go('/proactivity');
    });
    text6.click(function(){
      Router.go('/proactivity');
    });

    habit2.click(function(){
      Router.go('/mission');
    });
    text7.click(function(){
      Router.go('/mission');
    });

    habit3.click(function(){
      Router.go('/timetable');
    });
    text8.click(function(){
      Router.go('/timetable');
    });

    habit1.mouseover(function(){
      this.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#fff'});
    });
    text6.mouseover(function(){
      this.attr({fill: darkestGreen, cursor: 'pointer'});
      habit1.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#000'});
        habit1.attr({fill: '#000'});
      });

    habit2.mouseover(function(){
      this.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#fff'});
    });
    text7.mouseover(function(){
      this.attr({fill: darkestGreen, cursor: 'pointer'});
      habit2.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#000'});
        habit2.attr({fill: '#000'});
      });  

    habit3.mouseover(function(){
      this.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#fff'});
    });
    text8.mouseover(function(){
      this.attr({fill: darkestGreen, cursor: 'pointer'});
      habit3.attr({fill: lightGreen, cursor: 'pointer'});
      }).mouseout(function(){
        this.attr({fill: '#000'});
        habit3.attr({fill: '#000'});
      });    

  });

});
