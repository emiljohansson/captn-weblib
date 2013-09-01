//-----------------------------------------------------------
//	Inheritance
//-----------------------------------------------------------

Rectangle.prototype = new Point();
Rectangle.prototype.constructor = Rectangle;

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
function Rectangle(x, y, width, height) {

	//-----------------------------------------------------------
	//	Constructor call
	//-----------------------------------------------------------

	Point.call(this, x, y);

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
	var _width = width;

	/**
	 *	...
	 *	@default {Number}
	 */
	var _height = height;

	/**
	 *	...
	 *	@default {String}
	 */
	var _backgroundColor = null;

	//-----------------------------------------------------------
	//	Public getter methods
	//-----------------------------------------------------------

	/**
	 *  ...
	 *
	 *  @default {Number}
	 */
	Object.defineProperty(this, "width", {
		get: function() {
			return _width;
		},
		set: function(value) {
			_width = value;
		}
	});

	/**
	 *  ...
	 *
	 *  @default {Number}
	 */
	Object.defineProperty(this, "height", {
		get: function() {
			return _height;
		},
		set: function(value) {
			_height = value;
		}
	});

	/**
	 *  ...
	 *
	 *  @default {String}
	 */
	Object.defineProperty(this, "backgroundColor", {
		get: function() {
			return _backgroundColor;
		},
		set: function(value) {
			_backgroundColor = value;
		}
	});

	//-----------------------------------------------------------
	//	Public methods
	//-----------------------------------------------------------

	/**
	 *	...
	 *
	 *	@param	CanvasRenderingContext2D	context
	 *	@return {undefined}
	 */
	this.draw = function(context) {
		context.beginPath();
		context.rect(_this.x, _this.y, _this.width, _this.height);
		if (_this.backgroundColor !== null) {
			context.fillStyle = _backgroundColor;
			context.fill();
		}
	};
}