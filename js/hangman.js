(function($) {

	var HangmanJS = function() {

		if ((!this instanceof HangmanJS)) {
			return new HangmanJS();
		}

		this.init = function() {
			alert($);
		}

	}

	var hangman = new HangmanJS();

})($);