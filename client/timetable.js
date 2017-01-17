Template.timetable.onRendered(function(){
	Session.set('addEvent', false);
	/* initialize the external events-----------------------------------------------------------------*/
	window.setTimeout(function(){
		$('#external-events .fc-event').each(function() {
		    // store data so the calendar knows to render an event upon drop
		    $(this).data('event', {
		        title: $.trim($(this).text()), // use the element's text as the event title
		        stick: true // maintain when user navigates (see docs on the renderEvent method)
		    });

		    // make the event draggable using jQuery UI
		    $(this).draggable({
		        zIndex: 999,
		        revert: true,      // will cause the event to go back to its
		        revertDuration: 0  //  original position after the drag
		    });

		});	

	},500);

    var isEventOverDiv = function(x, y) {

        var external_events = $( '#external-events' );
        var offset = external_events.offset();
        offset.right = external_events.width() + offset.left;
        offset.bottom = external_events.height() + offset.top;

        // Compare
        if (x >= offset.left
            && y >= offset.top
            && x <= offset.right
            && y <= offset .bottom) { return true; }
        return false;

    }

    var getEvents = function(){
    	var events = [
	    	{
	    		title: "event1",
	    		start: "2017-01-17T13:00:00"
	    	},
	    	{
	    		title: "event2",
	    		start: "2017-01-17T17:00:00"
	    	}
    	];
    	console.log(events);
    	return events;
    }	

    $('.deleteDiv').droppable({
        drop: function(event, ui) {
        	console.log("delete div droppable over functoin");
            ui.draggable.remove();
            var deleteTitle = $(ui.draggable).text();
            console.log(deleteTitle);
            elementId = Priorities.findOne({title: deleteTitle})._id;
            console.log(elementId)
            Priorities.remove({_id: elementId});
        }
    });


    /* initialize the calendar
    -----------------------------------------------------------------*/

    $('#calendar').fullCalendar({
    	events: getEvents(),
    	height: 650,
		contentHeight:'auto',
		slotDuration:'00:60:00',
		header: {
			left: 'prev',
			center: 'title',
			right: 'next,listWeek'
		},
		minTime: "07:00:00",
		maxTime: "23:00:00",
		defaultView: 'agendaWeek',
		allDayText: 'Today\'s \npriorities',
        editable: true,
        eventLimit: true,
        droppable: true, // this allows things to be dropped onto the calendar
        dragRevertDuration: 0,
        drop: function(date) {
        	deleteTitle= this.innerHTML;
        	console.log(this.innerHTML);
			insertStart=date.format();
			defaultDuration = moment.duration($('#calendar').fullCalendar('option', 'defaultTimedEventDuration'));
			//insertEnd = date.add(defaultDuration); // on drop we only have date given to us
            elementId = Priorities.findOne({title: deleteTitle})._id;
            insertTitle = Priorities.findOne({_id: elementId}).title;
            insertDescription = Priorities.findOne({_id: elementId}).description;
            currentUser = Meteor.userId();
            insertColor = Priorities.findOne({_id: elementId}).color;
            
            Events.insert({
            	title: insertTitle, 
            	//allDay: false, 	
            	start: insertStart, 
            	//end: insertEnd, 
            	eventUser: currentUser,
            	//color: insertColor
            });

            Priorities.remove({_id:elementId});
            // console.log(elementId)
			// Events.insert({});


			// retrieve the dropped element's stored Event Object
			// var originalEventObject = $(this).data('eventObject');

			// // we need to copy it, so that multiple events don't have a reference to the same object
			// var copiedEventObject = $.extend({}, originalEventObject);

			// // assign it the date that was reported
			// copiedEventObject.start = date;
			// //copiedEventObject.allDay = allDay;

			// copiedEventObject.backgroundColor = $(this).css("background-color");
			// copiedEventObject.borderColor = $(this).css("border-color");

			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			//$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
        },
        eventDragStop: function( event, jsEvent, ui, view ) {
        
            if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
                $('#calendar').fullCalendar('removeEvents', event._id);
                var el = $( "<div class='fc-event'>" ).appendTo( '#external-events-listing' ).text( event.title );
                el.draggable({
                  zIndex: 999,
                  revert: true, 
                  revertDuration: 0 
                });
                el.data('event', { title: event.title, id :event.id, stick: true });
            }


        },
	    eventClick:  function(event, jsEvent, view) {
		      $('#modalTitle').html(event.title);
		      $('#modalBody').html(event.description);
		      $('#eventUrl').attr('href',event.url);
		      $('#fullCalModal').modal();
	   		 },
	   		 dayClick: function (date, allDay, jsEvent, view) {
	            $('#popupEventForm').modal('show');
	        }
	});
});

Template.timetable.events({
	'click .eventButton': function(event){
		Session.set('addEvent', true);

	},
	'click .goBack':function(event){
		Session.set('addEvent', false);
	}

});

Template.timetable.helpers({
	'addingEvent' : function(){
		return Session.get('addEvent');
	}
});


Template.roleItems.helpers({
	'role' : function(){
		return Roles.find();
	}
});

Template.roleItems.events({
	'keyup #roleInput': function(event){
		var documentId = this._id;
		var roleItem = $(event.target).val();
		Roles.update({_id: documentId}, {$set: { name: roleItem}});
	}
});

Template.goalItems.helpers({
	'goal' : function(){
		return Goals.find();
	},
	'last' : function(){
		if(this.number == 4){
			return true;
		}
		return false;
	}
});

Template.goalItems.events({
	'keyup #goalInput': function(event){
		var documentId = this._id;
		var goalItem = $(event.target).val();
		Goals.update({ _id: documentId }, {$set: { name: goalItem }});
	}
});


Template.addEvent.events({
	'click .addEvent':function(event){
		event.preventDefault();
		var currentUser = Meteor.userId();
		var eventTitle = $('#eventTitle').val();
		var eventDescription = $('#eventDescription').val();
		var eventColor = $('#eventColor').val();
		Priorities.insert({eventUser:currentUser, title: eventTitle, description: eventDescription, color: eventColor});
		$('#eventTitle').val('');
		$('#eventDescription').val('');
		Session.set('addEvent', false);
		console.log("refreshing...");
		Router.current().render(Template.timetable);
	}
});

Template.weeklyPrioritiesTemplate.helpers({
	'priorities' : function(){
		return Priorities.find().fetch();
	}	
});

	// $('#calendar').fullCalendar({
		
		

	// 	editable: true,
	// 	 // allow "more" link when too many events
	// 	events: [
	// 		{
	// 			title: 'All Day Event',
	// 			start: '2017-01-12'
	// 		},
	// 		{
	// 			title: 'Long Event',
	// 			start: '2017-01-12',
	// 			end: '2017-01-13'
	// 		},
	// 		{
	// 			title: 'Repeating Event',
	// 			start: '2016-12-09T16:00:00'
	// 		},
	// 		{
	// 			title: 'Repeating Event',
	// 			start: '2016-12-16T16:00:00'
	// 		},
	// 		{
	// 			title: 'Conference',
	// 			start: '2017-01-12',
	// 			end: '2017-01-14'
	// 		},
	// 		{
	// 			title: 'Meeting',
	// 			start: '2017-01-14T10:30:00',
	// 			end: '2017-01-14T12:30:00'
	// 		},
	// 		{
	// 			title: 'Lunch',
	// 			start: '2017-01-13T12:00:00'
	// 		},
	// 		{
	// 			title: 'Meeting',
	// 			start: '2017-01-11T14:30:00'
	// 		},
	// 		{
	// 			title: 'Happy Hour',
	// 			start: '2017-01-12T20:30:00'
	// 		},
	// 		{
	// 			title: 'Dinner',
	// 			start: '2016-12-12T20:00:00'
	// 		},
	// 		{
	// 			title: 'Birthday Party',
	// 			start: '2016-12-13T07:00:00'
	// 		},
	// 		{
	// 			title: 'Click for Google',
	// 			url: 'http://google.com/',
	// 			start: '2016-12-28'
	// 		}
	// 	],
	// 	eventClick:  function(event, jsEvent, view) {
	//       $('#modalTitle').html(event.title);
	//       $('#modalBody').html(event.description);
	//       $('#eventUrl').attr('href',event.url);
	//       $('#fullCalModal').modal();
 //   		 },
 //   		 dayClick: function (date, allDay, jsEvent, view) {
 //            $('#popupEventForm').modal('show');
 //        },
	// });