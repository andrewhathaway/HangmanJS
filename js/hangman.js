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
		 *
		 */
		HangmanJS.failed_score = 11;

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

					if (c != '') {
						HangmanJS.input_char(c);
						input.val('');
					}
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
							$('.word-characters li[data-id="' + i + '"]').html(character);
						}

						//console.log('I: ' + i + ' Char:' + HangmanJS.current_word.chars[i] + ' ENTERED: ' + character);
					}

				} else {
					HangmanJS.fail_score++;
				}
			}
		}

		HangmanJS.setup_characters = function() {
			var list = $('.word-characters');

			console.log(HangmanJS.current_word.word);

			for (var i = 0; i < HangmanJS.current_word.chars.length; i++) {
				list.append('<li data-id="' + i + '"></li>');
			}
		};

		/**
		 * Reverts the game
		 */
		HangmanJS.revert_game = function() {
			$('#alphabet').empty();
			HangmanJS.used_characters = [];
		}

	}

	//Move this shit
	var hangman = new HangmanJS();
	hangman.init();

});