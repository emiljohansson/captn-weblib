/**
 *	https://github.com/emiljohansson/captn
 *
 *	Object for handling dom events.
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
(function() {

	"use strict";

	//-----------------------------------------------------------
	//	Public class
	//-----------------------------------------------------------

	var Event = {};

	//-----------------------------------------------------------
	//	Public static constant properties
	//-----------------------------------------------------------

	Event.EventType = {};
	Event.EventType.LOAD = 'load';
	Event.EventType.SUBMIT = 'submit';

	//-----------------------------------------------------------
	//	Private methods
	//-----------------------------------------------------------

	/**
	 *	Appends an event to each element in the array.
	 *
	 *	@param	{array}		elemList
	 *	@param	{string}	type
	 *	@param	{Function}	listener
	 *	@param	{string}	useCapture
	 *	@return	{undefined}
	 */
	function addListenerToArray(elemList, type, listener, useCapture) {
		var i = elemList.length;
		while (i--) {
			Event.addListener(elemList[i], type, listener, useCapture);
		}
	}

	//-----------------------------------------------------------
	//	Public methods
	//-----------------------------------------------------------

	/**
	 *	Appends an event to an element.
	 *
	 *	@param	{HTMLElement | array}	elem
	 *	@param	{string}				type
	 *	@param	{Function}				listener
	 *	@param	{string}				useCapture
	 *	@return	{HTMLElement}
	 */
	Event.addListener = function(elem, type, listener, useCapture) {
		useCapture = useCapture || false;
		if (Object.prototype.toString.call( elem ) === '[object Array]') {
			addListenerToArray(elem, type, listener, useCapture);
			return;
		}
		if (!elem) {
			return;
		}
		if (elem.addEventListener) {
			elem.addEventListener(type, listener, useCapture);
		}
		else if (elem.attachEvent) {
			elem.attachEvent('on'+type, listener);
		}
		return elem;
	};

	/**
	 *	Removes an event from an element.
	 *
	 *	@param	{HTMLElement | array}	elem
	 *	@param	{string}				type
	 *	@param	{Function}				listener
	 *	@param	{string}				useCapture
	 *	@return	{HTMLElement}
	 */
	Event.removeListener = function(elem, type, listener, useCapture) {
		useCapture = useCapture || false;
		if (!elem || !listener) {
			return;
		}
		if (elem.removeEventListener) {
			elem.removeEventListener(type, listener, true);
		}
		else if (elem.detachEvent) {
			elem.detachEvent('on'+type, listener);
		}
		return elem;
	};

	/**
	 *	Using an element to trigger an event.
	 *
	 *	@param	{HTMLElement | array}	elem
	 *	@param	{string}				type
	 *	@param	{Function}				listener
	 *	@param	{string}				useCapture
	 *	@return	{HTMLElement}
	 */
	Event.trigger = function(elem, type) {
		if (!elem) {
			return;
		}
		var event;
		if (document.createEvent) {
			event = document.createEvent("HTMLEvents");
			event.initEvent(type, true, true);
		}
		else {
			event = document.createEventObject();
			event.eventType = type;
		}
		if (document.createEvent) {
			elem.dispatchEvent(event);
		}
		else {
			elem.fireEvent("on" + event.eventType, event);
		}
		return elem;
	};

	/**
	 *	Returns the current target of the event.
	 *
	 *	@param	{BrowserEvent}	event
	 *	@return {boolean}
	 */
	Event.currentTarget = function(event) {
		return !!event.currentTarget ? event.currentTarget : event.srcElement;
	};

	captn.event = Event;
}());