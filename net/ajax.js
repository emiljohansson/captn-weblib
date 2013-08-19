/**
 *	https://github.com/emiljohansson/captn
 *
 *	Object for handling ajax calls.
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
captn.define(function() {

	"use strict";
	
	//-----------------------------------------------------------
	//	Requirements
	//-----------------------------------------------------------

	captn.require(captn.util.json);

	//-----------------------------------------------------------
	//	Private class
	//-----------------------------------------------------------

	var HTTPHandler = function(url) {

		//-----------------------------------------------------------
		//	Private properties
		//-----------------------------------------------------------

		/**
		 *	The url to the file to collect data from.
		 *	@default {string}
		 *	@private
		 */
		this._url = url;

		/**
		 *	...
		 *	@default {XMLHttpRequest | ActiveXObject}
		 *	@private
		 */
		this._requestObject;

		/**
		 *	...
		 *	@default {boolean}
		 *	@private
		 */
		this._async = true;

		/**
		 *	Will be triggered on complete of the request.
		 *	@default {Function}
		 *	@private
		 */
		this._onComplete;

		/**
		 *	Will be triggered on failure of the request.
		 *	@default {Function}
		 *	@private
		 */
		this._onFail;

		//-----------------------------------------------------------
		//	Public properties
		//-----------------------------------------------------------

		/**
		 *	The request method type, e.g. POST or GET.
		 *	@default {string}
		 */
		this.method;

		/**
		 *	...
		 *	@default {boolean}
		 */
		this.contentType;

		/**
		 *	...
		 *	@default {object | null}
		 */
		this.data = null;
	};

	//-----------------------------------------------------------
	//	Public methods
	//-----------------------------------------------------------

	/**
	 *	Initializes the handler.
	 *
	 *	@return {HTTPHandler}
	 */
	HTTPHandler.prototype.init = function() {
		if (this.method === undefined) {
			throw "HTTP request method was not set.";
		}
		this._initHttpRequest();
		if (this._requestObject === undefined || this._requestObject === null) {
			throw "Request failed, your browser is not supported";
		}
		this._requestObject.onreadystatechange = this._onReadyStateChange.bind(this);
		this._requestObject.open(this.method, this._url, this._async);
		this._requestObject.setRequestHeader('Content-Type', this.contentType);
		this._send();
	};

	/**
	 *	Triggers when the request is complete.
	 *
	 *	@return {HTTPHandler}
	 */
	HTTPHandler.prototype.complete = function(func) {
		this._onComplete = func;
		return this;
	};

	/**
	 *	Triggers if the request fails.
	 *
	 *	@return {HTTPHandler}
	 */
	HTTPHandler.prototype.fail = function(func) {
		this._onFail = func;
		return this;
	};

	/**
	 *	Triggers the fail method.
	 *
	 *	@param	{mixed}	data	
	 *	@return	{undefined}
	 */
	HTTPHandler.prototype._triggerFail = function(data) {
		if (typeof this._onFail !== 'function') throw 'An error occured with the AJAX call';
		this._onFail(data);
	};

	/**
	 *	Sends the request
	 *
	 *	@return	{undefined}
	 */
	HTTPHandler.prototype._send = function() 
	{
		if (this.contentType === "json") {
			this.data = captn.util.json.parse(this.data);
		}
		this._requestObject.send(this.data);
	};

	//-----------------------------------------------------------
	//	Private methods
	//-----------------------------------------------------------

	/**
	 *	Creates an http request object with backward browser support.
	 *
	 *	@return	{undefined}
	 */
	HTTPHandler.prototype._initHttpRequest = function() 
	{
		this._requestObject = (function() {
			if (!window.XMLHttpRequest) {
				try {
					return new ActiveXObject("Msxml2.XMLHTTP");
				}
				catch (e) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP");
					} 
					catch (err) {
						return null;
					}
				}
			}
			return new XMLHttpRequest();
		}());
	};

	/**
	 *	Triggers on complete or error methods and returns success.
	 *
	 *	@return	{boolean}
	 */
	HTTPHandler.prototype._onReadyStateChange = function() 
	{
		if (this._requestObject.readyState === readyState.complete) {
			if (this._requestObject.status === status.success) {
				if (typeof this._onComplete === 'function') {
					this._onComplete(this._requestObject.responseText);
					return true;
				}
			} 
			else {
				this._triggerFail(
					{
						status: this._requestObject.status,
						message: this._requestObject.statusText
					}
				);
			}
		}
		return false;
	};

	//-----------------------------------------------------------
	//	Public class
	//-----------------------------------------------------------

	var Ajax = {};

	//-----------------------------------------------------------
	//	Private constant properties
	//-----------------------------------------------------------

	/**
	 *	...
	 *	@default {string}
	 */
	var GET = "get";

	/**
	 *	...
	 *	@default {string}
	 */
	var POST = "post";

	/**
	 *	...
	 *	@default {string}
	 */
	var GET_CONTENT_TYPE = "application/x-www-form-urlencoded; charset=UTF-8";

	/**
	 *	...
	 *	@default {string}
	 */
	var POST_CONTENT_TYPE = "application/x-www-form-urlencoded";

	/**
	 *	...
	 *	@default {object}
	 */
	var readyState	= {
		uninitialized	: 0,
		loading			: 1,
		loaded			: 2,
		interactive		: 3,
		complete		: 4
	};
	
	/**
	 *	...
	 *	@default {object}
	 */
	var status = {
		success	: 200,
		error	: 404
	};

	//-----------------------------------------------------------
	//	Public static methods
	//-----------------------------------------------------------

	/**
	 *	Makes a GET request call.
	 *
	 *	@return {HTTPHandler}
	 */
	Ajax.get = function(url, settings) {
		settings = settings || {};
		var handler				= new HTTPHandler(url);
			handler.data		= settings.data || null;
			handler.contentType	= GET_CONTENT_TYPE;
			handler.method		= GET;
			handler.init();
		return handler;
	};

	/**
	 *	Makes a GET request call.
	 *
	 *	@return {HTTPHandler}
	 */
	Ajax.post = function(url, settings) {
		settings = settings || {};
		var handler				= new HTTPHandler(url);
			handler.data		= settings.data || null;
			handler.contentType	= POST_CONTENT_TYPE;
			handler.method		= POST;
			handler.init();
		return handler;
	};

	/**
	 *	Handles POST submits.
	 *
	 *	@param	{HTMLElement}	form
	 *	@param	{Function}		submitCallback
	 *	@param	{object=}		opt_args
	 *	@return	{undefined}
	 */
	Ajax.handlePostForm = function(form, submitCallback, opt_args) {
		if (form === undefined || form === null) throw "form cannot be undefined";
		if (!form.hasAttribute('action')) throw "form is missing the action attribute";
		var url	= form.getAttribute('action');

		function onSubmit(event) {
			event.preventDefault();
			var data = serialize(form);
			Ajax.post(url, {
				data: data,
				caller: opt_args
			})
			.complete(submitCallback);
			if (opt_args === undefined) return;
			if (typeof opt_args.onSubmit !== 'function') return;
			opt_args.onSubmit();
		}

		captn.event.removeListener(form, captn.event.EventType.SUBMIT, onSubmit);
		captn.event.addListener(form, captn.event.EventType.SUBMIT, onSubmit);
	};

	//-----------------------------------------------------------
	//	Private methods
	//-----------------------------------------------------------

	/**
	 *	Serialize method was found at:
	 *	http://form-serialize.googlecode.com/svn/trunk/serialize-0.2.min.js
	 *	No rights reserved.
	 *	Author: Dimitar Ivanov
	 *	Date: 3 Aug, 2013
	 */
	function serialize(form){if(!form||form.nodeName!=="FORM"){return }var i,j,q=[];for(i=form.elements.length-1;i>=0;i=i-1){if(form.elements[i].name===""){continue}switch(form.elements[i].nodeName){case"INPUT":switch(form.elements[i].type){case"text":case"hidden":case"password":case"button":case"reset":case"submit":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"checkbox":case"radio":if(form.elements[i].checked){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value))}break;case"file":break}break;case"TEXTAREA":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"SELECT":switch(form.elements[i].type){case"select-one":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break;case"select-multiple":for(j=form.elements[i].options.length-1;j>=0;j=j-1){if(form.elements[i].options[j].selected){q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].options[j].value))}}break}break;case"BUTTON":switch(form.elements[i].type){case"reset":case"submit":case"button":q.push(form.elements[i].name+"="+encodeURIComponent(form.elements[i].value));break}break}}return q.join("&")};

	//-----------------------------------------------------------
	//	Namespace relation
	//-----------------------------------------------------------

	captn.net.ajax = Ajax;
});