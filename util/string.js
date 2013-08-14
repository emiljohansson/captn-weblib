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

	captn.util.string = {};

	//-----------------------------------------------------------
	//	Public static methods
	//-----------------------------------------------------------

	/**
	 *	Found at: http://www.xul.fr/ajax/responseHTML-attribute.php
	 *	Returns the body content of an html file.
	 *
	 *	@param	{string} content
	 *	@return	{string}
	 */
	captn.util.string.getBody = function(content)
	{ 
		var x = content.indexOf("<body");
			x = content.indexOf(">", x);    
		var y = content.lastIndexOf("</body>"); 
		return content.slice(x + 1, y);
	};
});