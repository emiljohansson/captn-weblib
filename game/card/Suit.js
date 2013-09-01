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
function Suit(suit) {

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
	var _cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

	/**
	 *	...
	 *	@default {integer}
	 */
	var _suit = suit;

	//-----------------------------------------------------------
	//	Public methods
	//-----------------------------------------------------------

	/**
	 *  If not specified, a random number will be returned.
	 *
	 *	@param	{undefined | Number}	opt_number
	 *  @return {Number}
	 */
	this.getCard = function(opt_number) {
		if (_cards.length <= 0) throw "No more cards in suit: "+_suit;
		var r = Math.floor(Math.random() * _cards.length);
		if (opt_number !== undefined) {
			r = _cards.indexOf(opt_number);
			console.assert(r >= 0, (opt_number + " was not in the suit"));
			if (r < 0) {
				throw opt_number + " was not in the suit";
			}
			console.log("pass", r);
		}
		var c = _cards.splice(r, 1);
		return new Card(c, _suit);
	};

	/**
	 *  ...
	 *
	 *  @return {Number}
	 */
	this.isEmpty = function() {
		return _cards.length <= 0;
	};
}

//-----------------------------------------------------------
//	Public static properties
//-----------------------------------------------------------

/**
 *	...
 *	@default {integer}
 */
Suit.CLUBS = 0;

/**
 *	...
 *	@default {integer}
 */
Suit.DIAMONDS = 1;

/**
 *	...
 *	@default {integer}
 */
Suit.HEARTS = 2;

/**
 *	...
 *	@default {integer}
 */
Suit.SPADES = 3;