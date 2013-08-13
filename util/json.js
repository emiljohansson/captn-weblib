/**
 *	https://github.com/emiljohansson/captn
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
captn.util.json = {};

/**
 *	Parses a string to valid json data.
 *
 *	@param	{string}	data
 *	@return	{object}
 */
captn.util.json.parse = function(data) {
	if (JSON !== undefined) {
		if (typeof JSON.parse === "function") {
			return JSON.parse(data);
		}
	}
	return eval("(function(){return " + strJSON + ";})()");
};