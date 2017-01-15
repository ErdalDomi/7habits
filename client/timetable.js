Template.timetable.onRendered(function(){
	/* initialize the external events
	-----------------------------------------------------------------*/

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

    /* initialize the calendar
    -----------------------------------------------------------------*/

    $('#calendar').fullCalendar({
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
        drop: function() {
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
	'click .saveEvent': function(event){
		var title = $("#eventTitle").val();
        var date = $('#eventDate').val();
        var time = $('#eventTime').val();
        var description = $("#eventDescription").val();
        var events = new Array();
        event = new Object();
        event.title = title;
        event.start = date;
        event.allDay = false;
        $('#calendar').fullCalendar('renderEvent', event);
        console.log("got here");		
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