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
		 * Array of used characters
		 */
		HangmanJS.used_characters = [];

		/**
		 * The current word
		 */
		HangmanJS.current_word = {};

		/**
		 * The death score
		 */
		HangmanJS.fail_score = 0;

		/**
		 * The score at which the player fails
		 */
		HangmanJS.failed_score = 8;

		/**
		 * Count of correct chars guessed
		 */
		HangmanJS.correctly_guessed = 0;

		/**
		 * Initiate HangmanJS
		 */
		this.init = function() {
			HangmanJS.bind_menu();

			if (document.location.href.indexOf('#game') > -1) {
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
			$('#credits').addClass('show');
			HangmanJS.bind_close();
		};

		/**
		 * Setup the game
		 */
		HangmanJS.setup_game = function() {
			HangmanJS.open_game();
			HangmanJS.bind_close();

			HangmanJS.current_word = HangmanJS.pick_word();

			HangmanJS.setup_characters();
			HangmanJS.setup_info();

			HangmanJS.bind_enter_character();
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

			if (from == 'game') {
				HangmanJS.revert_game();
			}
		};

		/**
		 * Pick a random word
		 */
		HangmanJS.pick_word = function() {
			var chars;
			var uppercase_chars = [];
			var item = HangmanJS.game_words[Math.floor(Math.random() * HangmanJS.game_words.length)];

			chars = item.split('');

			for (var i = 0; i < chars.length; i++) {
    			uppercase_chars.push(chars[i].toUpperCase());
			}

			return {
				word: item,
				length: item.length,
				chars: uppercase_chars
			};
		};

		/**
		 * Setup the list of the alphabet
		 */
		HangmanJS.setup_alphabet = function() {
			var list = $('#alphabet');
			var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

			for (var i = 0; i < alphabet.length; i++) {
				var next_char = alphabet.charAt(i);
				list.append('<li data-char="' + next_char + '">' + next_char + '</li>');
			}
		}

		HangmanJS.bind_enter_character = function() {
			var input = $('#enter-char-input');

			input.keypress(function(e) {
				if (e.which  == 13) {
					var c = input.val();

					if(c != '' && c.match(/^[a-zA-Z]+$/)) {
						HangmanJS.input_char(c);
					}

					input.val('');
				}
			});
		}

		/**
		 * Character delegate
		 */
		HangmanJS.input_char = function(character) {
			character = character.toUpperCase();

			if ($.inArray(character, HangmanJS.used_characters) == -1) {
				HangmanJS.used_characters.push(character);
				$('#alphabet li[data-char=' + character + ']').addClass('used');

				if ($.inArray(character, HangmanJS.current_word.chars) > -1) {

					for (var i = 0; i < HangmanJS.current_word.chars.length; i++) {

						if (HangmanJS.current_word.chars[i] == character) {
							HangmanJS.correctly_guessed++;
							$('.word-characters li[data-id="' + i + '"]').html(character);
						}

					}

					if (HangmanJS.correctly_guessed >= HangmanJS.current_word.length) {
						$('input').blur();
						$('#overlay').addClass('show');
						$('#overlay .modal.success').addClass('show');
					}

				} else {
					HangmanJS.fail_score++;

					if(HangmanJS.fail_score >= HangmanJS.failed_score) {
						$('input').blur();
						$('#overlay').addClass('show');
						$('#overlay .modal.failed').addClass('show');
					}
				}
			}
		}

		HangmanJS.setup_characters = function() {
			var list = $('.word-characters');

			for (var i = 0; i < HangmanJS.current_word.chars.length; i++) {
				list.append('<li data-id="' + i + '"></li>');
			}
		};

		HangmanJS.setup_info = function() {
			$('.word-length').html(HangmanJS.current_word.length);
		};

		/**
		 * Reverts the game
		 */
		HangmanJS.revert_game = function() {
			$('#alphabet').empty();
			HangmanJS.used_characters = [];

			HangmanJS.fail_score = 0;
			HangmanJS.correctly_guessed = 0;

			$('.word-characters').html('');

			$('#overlay').removeClass('show');
			$('#overlay .modal.failed').removeClass('show');
			$('#overlay .modal.succuess').removeClass('show');
		};

	}

	//Move this shit
	var hangman = new HangmanJS();
	hangman.init();

});