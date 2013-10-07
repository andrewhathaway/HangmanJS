$(function() {

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
		HangmanJS.game_words = [
			'technology',
			'fantastic'
		];

		/**
		 * Initiate HangmanJS
		 */
		this.init = function() {
			HangmanJS.bind_menu();
		};

		/**
		 * Bind menu buttons
		 */
		HangmanJS.bind_menu = function() {
			var play_button = $('#play-game');

			play_button.click(function(e) {
				e.preventDefault();
				HangmanJS.setup_game();
			});
		}

		/**
		 * Setup the game
		 */
		HangmanJS.setup_game = function() {
			HangmanJS.open_game();
		}

		/**
		 * Open the game window
		 */
		HangmanJS.open_game = function() {
			var stage = $('#game-stage');
			stage.addClass('show');
		};

		HangmanJS.to_menu = function(from) {
			switch(from) {

				case 'game':

					break;

				case 'credits':

					break;

			};
		};

	}

	var hangman = new HangmanJS();
	hangman.init();

});