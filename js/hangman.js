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

			if(document.location.href.indexOf('#game') > -1) {
				HangmanJS.setup_game();
			}
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

		/**
		 * View the credits page
		 */
		HangmanJS.view_credits = function() {
			var credits = $('#credits');
			credits.addClass('show');

			HangmanJS.bind_close();
		};

		/**
		 * Setup the game
		 */
		HangmanJS.setup_game = function() {
			var word;

			HangmanJS.open_game();
			HangmanJS.bind_close();

			word = HangmanJS.pick_word();

			HangmanJS.setup_alphabet();
		}

		/**
		 * Open the game window
		 */
		HangmanJS.open_game = function() {
			var stage = $('#game-stage');
			stage.addClass('show');
		};

		/**
		 * Close button bindings
		 */
		HangmanJS.bind_close = function() {
			$('.js-to-menu').click(function(e) {
				HangmanJS.to_menu($(this).data('from'));
			});
		}

		/**
		 * Go to the menu
		 */
		HangmanJS.to_menu = function(from) {
			$('.game-section.' + from).removeClass('show');

			if(from == 'game') {
				HangmanJS.revert_game();
			}
		};

		/**
		 * Pick a random word
		 */
		HangmanJS.pick_word = function() {
			var item = HangmanJS.game_words[Math.floor(Math.random() * HangmanJS.game_words.length)];

			return {
				word: item,
				length: item.length,
				chars: item.split('')
			};
		};

		HangmanJS.setup_alphabet = function() {
			var list = $('#alphabet');
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


			for(var i = 0; i < alphabet.length; i++) {
				var next_char = alphabet.charAt(i);
				list.append('<li data-char="' + next_char + '">' + next_char + '</li>');
			}
		}

		HangmanJS.revert_game = function() {
			var list = $('#alphabet');

			list.empty();
		}

	}

	//Move this shit
	var hangman = new HangmanJS();
	hangman.init();

});