/**
 *	https://github.com/emiljohansson/captn
 *
 *	A simple binary tree for making a sorted list of object.
 *	Duplicates are ignored.
 *
 *	@author		Emil Johansson <emiljohansson.se@gmail.com>
 *	@copyright	Copyright (c) 2013.
 *	@license	Creative Commons (BY-NC-SA)
 *	@version	0.1.3
 *	@since		2013-08-10
 */
captn.define(function() {

	//-----------------------------------------------------------
	//	Private class
	//-----------------------------------------------------------

	/**
	 *	A node in the tree. Is only availible to the tree.
	 *
	 *	@param	{number | string}	value
	 *	@constructor
	 */
	function BinaryNode(anItem, parentNode) {
		
		//-----------------------------------------------------------
		//	Private properties
		//-----------------------------------------------------------

		/**
		 *	...
		 *	@default {object}
		 */
		var _this = this;

		/**
		 *	...
		 *	@default {object}
		 */
		var _item = anItem;

		//-----------------------------------------------------------
		//	Public properties
		//-----------------------------------------------------------

		/**
		 *	The parent node.
		 *	@default {BinaryNode}
		 */
		this.parent = parentNode;

		/**
		 *	The left node.
		 *	@default {BinaryNode}
		 */
		this.left = null;

		/**
		 *	The right node.
		 *	@default {BinaryNode}
		 */
		this.right = null;

		//-----------------------------------------------------------
		//	Private methods
		//-----------------------------------------------------------

		/**
		 *	Returns if the node has any children. 
		 *
		 *	@param	{}	
		 *	@return	{boolean}
		 */
		function isLeaf() {
			return captn.isNull(_this.left) && captn.isNull(_this.right);
		}

		/**
		 *	Returns if the node has any children. 
		 *
		 *	@param	{}	
		 *	@return	{boolean}
		 */
		function twoChildren() {
			return !captn.isNull(_this.left) && !captn.isNull(_this.right);
		}
		
		//-----------------------------------------------------------
		//	Public methods
		//-----------------------------------------------------------
		
		/**
		 *	Adds a node to the left or right, comparing this nodes value.
		 *	The same value will go to the left.
		 *
		 *	@param	{object}	item	item must have a callable method, "getValue".
		 *	@return {boolean}
		 */
		this.add = function(item) { 
			var value = _item.getValue();
			if (item.getValue() < value) {
				if (captn.isNull(this.left)) { 
					this.left = new BinaryNode(item, this);
					return true;
				}
				else {
					return this.left.add(item);
				}
			}
			else if (item.getValue() > value) {
				if (captn.isNull(this.right)) {
					this.right = new BinaryNode(item, this);
					return true;
				}
				else {
					return this.right.add(item);
				}
			}
			return false;
		};
		
		/**
		 *	Removes an element with the matching value.
		 *
		 *	@param	{number | string}	value
		 *	@return	{undefined}
		 */
		this.remove = function(value) {
			if (value === _item.getValue()) {
				if (isLeaf()) {
					return null;
				}
				else if (twoChildren()) {
					if (captn.isNull(this.right.left)) {
						this.right.left = this.left;
						return this.right;
					}
					else {
						//TODO handle the node instead.
						_item = this.right.getLowest();
						this.right = this.right.remove(_item.getValue());
					}
				}
				else {
					if (!captn.isNull(this.left)) {
						return this.left;
					}
					return this.right;
				}
			}
			else if (value < _item.getValue()) {
				if (!captn.isNull(this.left)) {
					this.left = this.left.remove(value);
				}
			}
			else {
				if (!captn.isNull(this.right)) {
					this.right = this.right.remove(value);
				}
			}
			return this;
		};

		/**
		 *	Returns the node with smallest value.
		 *
		 *	@return	{BinaryNode}
		 */
		this.getLowest = function() {
			if (captn.isNull(this.left)) {
				return _item;
			}
			return this.left.getLowest();
		};
		
		/**
		 *	Iterates the numbers of strings from the beginning to the end.
		 *	Passes the whole item to the handler method.
		 *
		 *	@param	{Function}	handlerMethod	Handles the value as pleases.
		 *	@return	{undefined}
		 */
		this.iterateForward = function(handlerMethod) {
			if (!captn.isNull(this.left)) this.left.iterateForward(handlerMethod);
			handlerMethod(_item);
			if (!captn.isNull(this.right)) this.right.iterateForward(handlerMethod);
		};
		
		/**
		 *	Iterates the numbers of strings from the end to the beginning.
		 *	Passes the whole item to the handler method.
		 *
		 *	@param	{Function}	handlerMethod	Handles the value as pleases.
		 *	@return	{undefined}
		 */
		this.iterateBackward = function(handlerMethod) {
			if (!captn.isNull(this.right)) this.right.iterateBackward(handlerMethod);
			handlerMethod(_item);
			if (!captn.isNull(this.left)) this.left.iterateBackward(handlerMethod);
		};
		
		/**
		 *	Returns an item with the matching value.
		 *
		 *	@param	{string | number}	value
		 *	@return	{item | undefined}
		 */
		this.get = function(value) {
			if (value === _item.getValue()) return _item;
			else if (value < _item.getValue() && !captn.isNull(this.left)) {
				return this.left.get(value);
			}
			else if (value > _item.getValue() && !captn.isNull(this.right)) {
				return this.right.get(value);
			}
		};
		
		/**
		 *	Iterates each child and returns the count.
		 *
		 *	@return	{integer}
		 */
		this.count = function() {
			var ct = 1;
			if (!captn.isNull(this.left)) {
				ct += this.left.count();
			}
			if (!captn.isNull(this.right)) {
				ct += this.right.count();
			}
			return ct;
		};
	}

	//-----------------------------------------------------------
	//	Public class
	//-----------------------------------------------------------

	/**
	 *	...
	 *
	 *	@constructor
	 */
	function BinarySearchTree() {
		
		//-----------------------------------------------------------
		//	Private properties
		//-----------------------------------------------------------

		/**
		 *	...
		 *	@default {integer}
		 */
		var _size = 0;

		/**
		 *	The first node in the tree.
		 *	@default {BinaryNode}
		 */
		var _root = null

		//-----------------------------------------------------------
		//	Private methods
		//-----------------------------------------------------------
		
		/**
		 *	...
		 *
		 *	@return	{boolean}
		 */
		function isEmpty() {
			return _root === null;
		}

		//-----------------------------------------------------------
		//	Public methods
		//-----------------------------------------------------------
		
		/**
		 *	Adds a node to the tree.
		 *
		 *	@param	{object}	item	item must have a callable method, "getValue".
		 *	@return {undefined}
		 */
		this.add = function(item) {
			if (!captn.isFunction(item.getValue)) throw "Item must contain getValue method.";
			if (isEmpty()) { 
				_root = new BinaryNode(item, null);
				_size++;
			}
			else {
				if (_root.add(item)) _size++;
				else return false;
			}
			return true;
		};
		
		/**
		 *	Removes an element with the matching value.
		 *
		 *	@param	{number | string}	value
		 *	@return	{undefined}
		 */
		this.remove = function(value) {
			if (isEmpty()) return;
			_root = _root.remove(value);
			_size--;
		};
		
		/**
		 *	Iterates the numbers of strings from the beginning to the end.
		 *	Passes the whole item to the handler method.
		 *
		 *	@param	{Function}	handlerMethod	Handles the value as pleases.
		 *	@return	{undefined}
		 */
		this.iterateForward = function(handlerMethod) {
			if (!captn.isFunction(handlerMethod)) throw "Handler method must be a method.";
			if (isEmpty()) return;
			return _root.iterateForward(handlerMethod);
		};
		
		/**
		 *	Iterates the numbers of strings from the end to the beginning.
		 *	Passes the whole item to the handler method.
		 *
		 *	@param	{Function}	handlerMethod	Handles the value as pleases.
		 *	@return	{undefined}
		 */
		this.iterateBackward = function(handlerMethod) {
			if (!captn.isFunction(handlerMethod)) throw "Handler method must be a method.";
			if (isEmpty()) return;
			return _root.iterateBackward(handlerMethod);
		};
		
		/**
		 *	Returns an item with the matching value.
		 *
		 *	@param	{string | number}	value
		 *	@return	{item | undefined}
		 */
		this.get = function(value) {
			if (isEmpty()) return;
			return _root.get(value);
		};
		
		/**
		 *	Returns the number of nodes in the tree.
		 *
		 *	@return	{integer}
		 */
		this.size = function() {
			return _size;
		};
		
		/**
		 *	Counts each node in the tree.
		 *
		 *	@return	{integer}
		 */
		this.count = function() {
			if (isEmpty()) return 0;
			return _root.count();
		};
	}

	//-----------------------------------------------------------
	//	Namespace relation
	//-----------------------------------------------------------

	captn.util.BinarySearchTree = BinarySearchTree;

});