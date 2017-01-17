var eventsArray = [];

Template.timetable.onRendered(function(){
	Session.set('addEvent', false);
	/* initialize the external events-----------------------------------------------------------------*/
	window.setTimeout(function(){
		$('#external-events .fc-event').each(function() {
		    // store data so the calendar knows to render an event upon drop
		    $(this).data('event', {
		        title: $.trim($(this).text()), // use the element's text as the event title
		        //stick: true // maintain when user navigates (see docs on the renderEvent method)
		    });

		    // make the event draggable using jQuery UI
		    $(this).draggable({
		        zIndex: 999,
		        revert: true,      // will cause the event to go back to its
		        revertDuration: 0  //  original position after the drag
		    });

		});	

	},500);//timer to wait for templates to render and fetch data from db, otherwise they wont initialize

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

    $('.deleteDiv').droppable({
        drop: function(event, ui) {
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
    	events: eventsArray,
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
			insertEnd = date.add(defaultDuration); // on drop we only have date given to us
            elementId = Priorities.findOne({title: deleteTitle})._id;
            insertTitle = Priorities.findOne({_id: elementId}).title;
            insertDescription = Priorities.findOne({_id: elementId}).description;
            currentUser = Meteor.userId();
            insertColor = Priorities.findOne({_id: elementId}).color;
            
            Events.insert({
            	title: insertTitle, 
            	allDay: false, 	
            	start: insertStart, 
            	end: insertEnd, 
            	eventUser: currentUser,
            	color: insertColor,
            	description: insertDescription
            });

            Priorities.remove({_id:elementId});

			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
        },

        eventDragStart: function (event) {
        	Session.set('beforeDragStart', event.start.format());
        },

        eventDrop: function(event){
    		console.log("doing update");
    		calendarEventTitle = event.title;
    		console.log(event.title);
    		calendarnewEventStart = event.start.format();
    		calendarnewEventEnd = event.start.format();
    		calendaroldEventStart = Session.get('beforeDragStart');
    		console.log("old event start:"+calendaroldEventStart);
    		console.log("new event start:"+calendarnewEventStart);

    		calendarEventId = Events.findOne({title:calendarEventTitle, start: calendaroldEventStart})._id;
    		Events.update({_id:calendarEventId},{$set:{start:calendarnewEventStart,end:calendarnewEventEnd}});
    		console.log("start should now be: "+Events.findOne({_id:calendarEventId}).start);  
        },
        eventDragStop: function( event, jsEvent, ui, view ) { 

            if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
            	console.log("is outside calendar");
                $('#calendar').fullCalendar('removeEvents', event._id);
	        	calendarEventTitle = event.title;
	        	calendarEventStart = event.start.format();
	        	calendarEvent = Events.findOne({title:calendarEventTitle, start: calendarEventStart});
	        	calendarEventId = Events.findOne({title:calendarEventTitle, start: calendarEventStart})._id;
	        	Priorities.insert(calendarEvent);
	        	Events.remove({_id:calendarEventId}); 
	        	Meteor._reload.reload();
            }
        },
	    eventClick:  function(event, jsEvent, view) {
		      $('#modalTitle').html(event.title);
		      $('#modalBody').html(event.description);
		      $('#eventUrl').attr('href',event.url);
		      $('#fullCalModal').modal();
	   	},
		eventResize: function(event,delta) {
			eventEnd = event.end.format();
	        eventStart = event.start.format();
	        eventTitle = event.title;
	        desiredEventId = Events.findOne({title:eventTitle,start:eventStart})._id;
	        Events.update({_id:desiredEventId},{$set:{end: eventEnd}});
	        console.log(Events.findOne({_id:desiredEventId}).end);
	        $('#calendar').fullCalendar('updateEvent', event);
	    }
	});
});

Template.timetable.events({
	'click .eventButton': function(event){
		Session.set('addEvent', true);

	},
	'click .goBack':function(event){
		event.preventDefault();
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
		currentUser = Meteor.userId();
		eventTitle = $('#eventTitle').val();
		eventDescription = $('#eventDescription').val();
		eventColor = $('#eventColor').val();
		Priorities.insert({eventUser:currentUser, title: eventTitle, description: eventDescription, color: eventColor});
		$('#eventTitle').val('');
		$('#eventDescription').val('');
		Session.set('addEvent', false);
		console.log("refreshing...");
		Meteor._reload.reload();
		//Router.current().render(Template.timetable);
	}
});

Template.weeklyPrioritiesTemplate.helpers({
	'priorities' : function(){
		//Router.current().render(Template.timetable);
		return Priorities.find().fetch();
	},
	'fetchEvents' : function(){
		events=[];
		Events.find().fetch().forEach(function(currentValue, index){
			currEvent = {
				title: currentValue.title,
				start: currentValue.start,
				end: currentValue.end, 
				description: currentValue.description,
				color: currentValue.color};
			events.push(currEvent);
		});
		eventsArray = events;
		console.log("doing refresh");
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', events);         
        $('#calendar').fullCalendar('rerenderEvents' );    	
	}	
});
