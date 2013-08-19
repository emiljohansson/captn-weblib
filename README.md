Captn
=====

Captn library currently contains the following:


Ajax
-------------

An ajax api...

	captn.net.ajax
		.get('event/event.js')
		.complete(function(data){}).
		fail(function(response){});

	captn.net.ajax.handlePostForm(
		document.getElementById('test_form'),
		function(data) {
			console.log("test form complete");
		}
	);

Event
-------------

Crossbrowser events for adding, removing and triggering browser event.

	captn.event.addListener(window, captn.event.EventType.LOAD, function() {});