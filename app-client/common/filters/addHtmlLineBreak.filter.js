(function () {
	angular
		.module('loc8rApp')
		.filter('addHtmlLineBreak',addHtmlLineBreak);

	function addHtmlLineBreak() {
		return function (text) {
			return text.replace(/\n/g,'<br/>');
		}
	}
})();