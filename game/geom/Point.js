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
function Point(x, y) {

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
	 *	@default {Number}
	 */
	var _x = x || 0;

	/**
	 *	...
	 *	@default {Number}
	 */
	var _y = y || 0;

	//-----------------------------------------------------------
	//	Public getter methods
	//-----------------------------------------------------------

	/**
	 *  ...
	 *
	 *  @default {Number}
	 */
	Object.defineProperty(this, "x", {
		get: function() {
			return _x;
		},
		set: function(value) {
			_x = value;
		}
	});

	/**
	 *  ...
	 *
	 *  @default {Number}
	 */
	Object.defineProperty(this, "y", {
		get: function() {
			return _y;
		},
		set: function(value) {
			_y = value;
		}
	});
}