Template.timetable.onRendered(function(){
    function ShowEventPopup(date) {
	    $('#popupEventForm').modal('show');
	    $('#eventTitle').focus();
	}
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
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				title: 'All Day Event',
				start: '2017-01-12'
			},
			{
				title: 'Long Event',
				start: '2017-01-12',
				end: '2017-01-13'
			},
			{
				title: 'Repeating Event',
				start: '2016-12-09T16:00:00'
			},
			{
				title: 'Repeating Event',
				start: '2016-12-16T16:00:00'
			},
			{
				title: 'Conference',
				start: '2017-01-12',
				end: '2017-01-14'
			},
			{
				title: 'Meeting',
				start: '2017-01-14T10:30:00',
				end: '2017-01-14T12:30:00'
			},
			{
				title: 'Lunch',
				start: '2017-01-13T12:00:00'
			},
			{
				title: 'Meeting',
				start: '2017-01-11T14:30:00'
			},
			{
				title: 'Happy Hour',
				start: '2017-01-12T20:30:00'
			},
			{
				title: 'Dinner',
				start: '2016-12-12T20:00:00'
			},
			{
				title: 'Birthday Party',
				start: '2016-12-13T07:00:00'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2016-12-28'
			}
		],
		eventClick:  function(event, jsEvent, view) {
	      $('#modalTitle').html(event.title);
	      $('#modalBody').html(event.description);
	      $('#eventUrl').attr('href',event.url);
	      $('#fullCalModal').modal();
   		 },
   		 dayClick: function (date, allDay, jsEvent, view) {
            $('#eventTitle').val("");
            $('#eventDate').val($.fullCalendar.formatDate(date, 'dd/MM/yyyy'));
            $('#eventTime').val($.fullCalendar.formatDate(date, 'HH:mm'));
            ShowEventPopup(date);
        },




	});
});