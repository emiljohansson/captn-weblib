Captn
=====

Example
-------------
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

	captn.event.addListener(window, captn.event.EventType.LOAD, function() {});