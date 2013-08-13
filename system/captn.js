/**
 *	https://github.com/emiljohansson/captn
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
var captn = {

	//---------------------------------------------------
	//  Public namespaces
	//---------------------------------------------------

	net: {},
	event: {},
	util: {},

	//-----------------------------------------------------------
	//	Public static methods
	//-----------------------------------------------------------

	/**
	 *	Douglas Crockford, “Javascript: The Good Parts” Chapter 5.5
	 *	Appends simple event possibillities on an object.
	 *
	 *	@param	{Object}	that
	 *	@return {Object}
	 */
	eventuality: function(that) {
		var registry = {};

		that.fire = function(event) {
			var array,
				func,
				handler,
				i,
				type = typeof event === 'string' ? event : event.type;

			if (registry.hasOwnProperty(type)) {
				array = registry[type];
				for (i = 0; i < array.length; i++) {
					handler = array[i];
					func = handler.method;
					if (typeof func === 'string') {
						func = this[func];
					}
					func.apply(this, handler.parameters || [event]);
				};
			}
			return this;
		};

		that.on = function(type, method, parameters) {
			var handler = {
				method: method,
				parameters: parameters
			};
			if (registry.hasOwnProperty(type)) {
				registry[type].push(handler);
			}
			else {
				registry[type] = [handler];
			}
			return this;
		};
		return that;
	},

	/**
	 *	Objects can add dependencies and if an object is not 
	 *	defined, an error will be triggered.
	 *
	 *	@param	{Object}	obj
	 *	@return	{Object}
	 */
	require: function(obj) 
	{
		if (obj === undefined) {
			console.trace();
			throw "Object is not defined.";
		}
		return obj;
	},

	/**
	 *	Add an observer to the list.
	 *
	 *	@param	{string}	event
	 *	@param	{Function}	callback
	 *	@param	{object}	context		Whom the this keyword is linked to.
	 *	@return {object}
	 */
	on: function(event, callback, context) {
		if (this.subscribers === undefined) this.subscribers = {};
		if (this.subscribers[event] === undefined) this.subscribers[event] = [];
		this.subscribers[event].push({
			callback: callback,
			context: context || this
		});
		return this;
	},

	/**
	 *	Removes an observer from the list.
	 *
	 *	@param	{string}	event
	 *	@param	{Function}	callback
	 *	@param	{object}	context		Whom the this keyword is linked to.
	 *	@return {object}
	 */
	off: function(event, callback, context) {
		if (this.subscribers === undefined) return this;
		if (this.subscribers[event] === undefined) return this;
		var subscribers = this.subscribers[event];
		if (subscribers === undefined) return this;
		var i = subscribers.length;
		while (i--) {
			if (subscribers[i].callback === callback) {
				subscribers.splice(i, 1);
			}
		}
		return this;
	},

	/**
	 *	Triggers an event to all observers.
	 *
	 *	@param	{string}	event
	 *	@param	{Function}	args	Extra arguments.
	 *	@return {object}
	 */
	emit: function(event, args) {
		if (this.subscribers === undefined) return this;
		if (this.subscribers[event] === undefined) return this;
		var subscribers = this.subscribers[event];
		if (subscribers === undefined) return this;
		var i = subscribers.length;
		while (i--) {
			subscribers[i].callback.call(subscribers[i].context, args);
		}
		return this;
	}
};