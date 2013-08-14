/**
 *	https://github.com/emiljohansson/captn
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
captn.define(function() {

	//-----------------------------------------------------------
	//	Public namespace
	//-----------------------------------------------------------

	captn.util.number = {};

	//-----------------------------------------------------------
	//	Public static methods
	//-----------------------------------------------------------

	/**
	 *	Returns if the passed value is a true number.
	 *
	 *	@param	{mixed}	val
	 *	@return	{boolean}
	 */
	captn.util.number.isNumber = function(val) {
		return typeof value === 'number' && isFinite(value);
	};
});