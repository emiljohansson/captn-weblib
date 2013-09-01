//-----------------------------------------------------------
//	Inheritance
//-----------------------------------------------------------

Card.prototype = new Element();
Card.prototype.constructor = Card;

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
function Card(number, suit) {

	//-----------------------------------------------------------
	//	Constructor call
	//-----------------------------------------------------------

	Element.call(this);

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
	var _number = number;

	//-----------------------------------------------------------
	//	Public getter methods
	//-----------------------------------------------------------

	/**
	 *  ...
	 *
	 *  @default {Object}
	 */
	Object.defineProperty(this, "number", {
		get: function() {
			return _number;
		}
	});



	//-----------------------------------------------------------
	//	Private methods
	//-----------------------------------------------------------

	/**
	 *	...
	 *
	 *	@return	{undefined}
	 */
	function _init() {
		_this.element = document.createElement('div');
	}

	_init();
}