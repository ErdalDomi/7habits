Template.proactivity.helpers({
  days : [
    {class: "completed", day: 1},
    {class: "completed", day: 2},
    {class: "completed", day: 3},
    {class: "current", day: 4},
    {class: "", day: 5},
    {class: "", day: 6},
    {class: "", day: 7},
    {class: "", day: 8},
    {class: "", day: 9},
    {class: "", day: 10},
    {class: "", day: 11},
    {class: "", day: 12},
    {class: "", day: 13},
    {class: "", day: 14},
    {class: "", day: 15},
    {class: "", day: 16},
    {class: "", day: 17},
    {class: "", day: 18},
    {class: "", day: 19},
    {class: "", day: 20},
    {class: "", day: 21},
    {class: "", day: 22},
    {class: "", day: 23},
    {class: "", day: 24},
    {class: "", day: 25},
    {class: "", day: 26},
    {class: "", day: 27},
    {class: "", day: 28},
    {class: "", day: 29},
    {class: "", day: 30}
  ]
});

Template.proactivity.events({
    'click .advance': function(event){
        $('.proactivityPrompt').stop().animate({
          'opacity' : '1'
        }, 500);;
        $('.advance').hide();
    }
});

Template.proactivity.onRendered(function(){
    $('.proactivityPrompt').css('opacity','0');
})