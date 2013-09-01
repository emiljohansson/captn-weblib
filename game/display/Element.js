//-----------------------------------------------------------
//	Inheritance
//-----------------------------------------------------------

Element.prototype = new Point();
Element.prototype.constructor = Element;

//-----------------------------------------------------------
//	Public class
//-----------------------------------------------------------

/**
 *	...
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	1.0.
 *	@since		2013-06-19
 */
function Element() {

	//-----------------------------------------------------------
	//	Private properties
	//-----------------------------------------------------------

	/**
	 *	...
	 *	@default {Object}
	 */
	var _this = this;

	/**
	 *	...
	 *	@default {Object}
	 */
	var _element = null;

	//-----------------------------------------------------------
	//	Public getter methods
	//-----------------------------------------------------------

	/**
	 *  ...
	 *
	 *  @default {Object}
	 */
	Object.defineProperty(this, "element", {
		get: function() {
			return _element;
		},
		set: function(el) {
			_element = el;
		}
	});
}