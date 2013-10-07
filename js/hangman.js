(function($) {

	var HangmanJS = function() {

		/**
		 * Make sure that we're a constructor and not a function call
		 */
		if ((!this instanceof HangmanJS)) {
			return new HangmanJS();
		}

		/**
		 * Default words to pick from
		 */
		this.words = [
			'technology',
			'fantastic'
		];

		/**
		 * Initiate HangmanJS
		 */
		this.init = function() {

		};

	}

	var hangman = new HangmanJS();
	hangman.init();

})($);