function $(node, selector){
	return node.querySelector(selector);
}
function $$(node,selector){
	return [].slice.call(node.querySelectorAll(selector));
}