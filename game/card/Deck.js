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
function Deck() {

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
	 *	@default {array}
	 */
	var _suits = [];

	/**
	 *	...
	 *	@default {array}
	 */
	var _cardCount = 0;

	//-----------------------------------------------------------
	//	Public methods
	//-----------------------------------------------------------

	/**
	 *  ...
	 *
	 *	@param	{undefined | Number}	opt_suit
	 *	@param	{undefined | Number}	opt_number
	 *  @return {Number}
	 */
	this.getCard = function(opt_suit, opt_number) {
		var suit = getSuit(opt_suit);
		if (suit === null) throw "No more cards in the deck"; 
		try {
			return suit.getCard(opt_number);
		}
		catch (e) {
			return _this.get;
		}
	};

	//-----------------------------------------------------------
	//	Private methods
	//-----------------------------------------------------------

	/**
	 *	...
	 *
	 *	@return	{undefined}
	 */
	function _init() {
		_suits.push(new Suit(Suit.CLUBS));
		_suits.push(new Suit(Suit.DIAMONDS));
		_suits.push(new Suit(Suit.HEARTS));
		_suits.push(new Suit(Suit.SPADES));
	}

	/**
	 *	Returns a suit. If the suit is empty it will be removed.
	 *
	 *	@param	{undefined | Number}	opt_suit
	 *	@return	{integer}
	 */
	function getSuit(opt_suit) {
		if (_suits.length === 0) return null;
		var r = opt_suit || Math.floor(Math.random() * _suits.length);
		var suit = _suits[r];
		if (suit.empty) {
			_suits.splice(r, 1);
			return getSuit();
		}
		return suit;
	}

	_init();
}