/**
 *	https://github.com/emiljohansson/captn
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.1
 *	@since		2013-08-10
 */
captn.util.dom = {};

/**
 *	Based on: http://stackoverflow.com/a/2155755/111592
 *	Returns true if the dom element contains the passed class name.
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{boolean}
 */
captn.util.dom.hasClass = function(elem, cls) {
	return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

/**
 *	Based on: http://stackoverflow.com/a/2155755/111592
 *	Removes the passed class name from a dom element.
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{HTMLElement}
 */
captn.util.dom.removeClass = function(elem, cls) {
	if (!captn.util.dom.hasClass(elem, cls)) return elem;
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	elem.className = elem.className.replace(reg,' ');
	return elem;
};

/**
 *	Appends the passed class name from a dom element.
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{HTMLElement}
 */
captn.util.dom.addClass = function(elem, cls) {
	if (captn.util.dom.hasClass(elem,cls)) return elem;
	elem.className = (elem.className + ' ' + cls).fulltrim();
	return elem;
};

/**
 *	Reverses the visibillity of an element, requires the 
 *	implementation of the css class "hide".
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{HTMLElement}
 */
captn.util.dom.swapVisibillity = function(elem) {
	if (captn.util.dom.hasClass(elem, 'hide')) {
		return captn.util.dom.showElem(elem);
	}
	return captn.util.dom.hideElem(elem);
};

/**
 *	Hides an element, requires the 
 *	implementation of the css class "hide".
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{HTMLElement}
 */
captn.util.dom.hideElem = function(elem) {
	return captn.util.dom.addClass(elem, 'hide');
};

/**
 *	Removes the hide class from an element, requires the 
 *	implementation of the css class "hide".
 *
 *	@param	{HTMLElement}	elem
 *	@param	{string}		cls
 *	@return	{HTMLElement}
 */
captn.util.dom.showElem = function(elem) {
	return captn.util.dom.removeClass(elem, 'hide');
};