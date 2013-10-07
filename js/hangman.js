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
			'fantastic',
			'buckaroo',
			'bandwagon',
			'icebox',
			'jawbreaker',
			'zombie',
			'cheese',
			'because',
			'football',
			'jazz',
			'exponential',
			'atlantis',
			'psychologist',
			'archaeologist',
			'quarantine',
			'champion',
			'protestant'
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
			var credits_button = $('#view-credits');

			play_button.click(function(e) {
				e.preventDefault();
				HangmanJS.setup_game();
			});

			credits_button.click(function(e) {
				e.preventDefault();
				HangmanJS.view_credits();
			});
		}

		HangmanJS.view_credits = function() {
			var credits = $('#credits');
			credits.addClass('show');

			HangmanJS.bind_close();
		};

		/**
		 * Setup the game
		 */
		HangmanJS.setup_game = function() {
			HangmanJS.open_game();
			HangmanJS.bind_close();
		}

		/**
		 * Open the game window
		 */
		HangmanJS.open_game = function() {
			var stage = $('#game-stage');
			stage.addClass('show');
		};

		HangmanJS.bind_close = function() {
			$('.js-to-menu').click(function(e) {
				HangmanJS.to_menu($(this).data('from'));
			});
		}

		HangmanJS.to_menu = function(from) {
			$('.game-section.' + from).removeClass('show');
		};

	}

	var hangman = new HangmanJS();
	hangman.init();

});