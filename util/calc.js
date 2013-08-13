/**
 *	https://github.com/emiljohansson/captn
 *
 *	Simple math operator methods.
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
captn.util.calc = {
	add: function(a, b) { return a + b; },
	divide: function(a, b) { return a / b; },
	multiply: function(a, b) { return a * b; },
	subtract: function(a, b) { return a - b; },
	percentage: function(a, b) { return (a / b) * 100; }
};