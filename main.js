// Memory Game
// © 2014 Nate Wiley
// License -- MIT
// best in full screen, works on phones/tablets (min height for game is 500px..) enjoy ;)
// Follow me on Codepen

(function () {
	var Memory = {
		init: function (cards) {
			this.$game = $(".game");
			this.$modal = $(".modal");
			this.$overlay = $(".modal-overlay");
			this.$restartButton = $("button.restart");
			this.cardsArray = $.merge(cards, cards);
			this.shuffleCards(this.cardsArray);
			this.setup();
		},

		shuffleCards: function (cardsArray) {
			this.$cards = $(this.shuffle(this.cardsArray));
		},

		setup: function () {
			this.html = this.buildHTML();
			this.$game.html(this.html);
			this.$memoryCards = $(".card");
			this.paused = false;
			this.guess = null;
			this.binding();
		},

		binding: function () {
			this.$memoryCards.on("click", this.cardClicked);
			this.$restartButton.on("click", $.proxy(this.reset, this));
		},
		// kinda messy but hey
		cardClicked: function () {
			var _ = Memory;
			var $card = $(this);
			if (
				!_.paused &&
				!$card.find(".inside").hasClass("matched") &&
				!$card.find(".inside").hasClass("picked")
			) {
				$card.find(".inside").addClass("picked");
				if (!_.guess) {
					_.guess = $(this).attr("data-id");
				} else if (
					_.guess == $(this).attr("data-id") &&
					!$(this).hasClass("picked")
				) {
					$(".picked").addClass("matched");
					_.guess = null;
				} else {
					_.guess = null;
					_.paused = true;
					setTimeout(function () {
						$(".picked").removeClass("picked");
						Memory.paused = false;
					}, 600);
				}
				if ($(".matched").length == $(".card").length) {
					_.win();
				}
			}
		},

		win: function () {
			this.paused = true;
			setTimeout(function () {
				Memory.showModal();
				Memory.$game.fadeOut();
			}, 1000);
		},

		showModal: function () {
			this.$overlay.show();
			this.$modal.fadeIn("slow");
		},

		hideModal: function () {
			this.$overlay.hide();
			this.$modal.hide();
		},

		reset: function () {
			this.hideModal();
			this.shuffleCards(this.cardsArray);
			this.setup();
			this.$game.show("slow");
		},

		// Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
		shuffle: function (array) {
			var counter = array.length,
				temp,
				index;
			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				index = Math.floor(Math.random() * counter);
				// Decrease counter by 1
				counter--;
				// And swap the last element with it
				temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}
			return array;
		},

		buildHTML: function () {
			var frag = "";
			this.$cards.each(function (k, v) {
				frag +=
					'<div class="card" data-id="' +
					v.id +
					'"><div class="inside">\
				<div class="front"><img src="' +
					v.img +
					'"\
				alt="' +
					v.name +
					'" /></div>\
				<div class="back"><img src="https://i.pinimg.com/564x/78/aa/a2/78aaa2fce3f3b882ade6dc4ebf29caa6.jpg"\
				alt="Codepen" /></div></div>\
				</div>';
			});
			return frag;
		}
	};

	var cards = [
		{
			name: "1",
			img:"IMG_20200406_002709.jpg",
			id: 1
		},
		{
			name: "2",
			img:"IMG_20200426_004426.jpg",
			id: 2
		},
		{
			name: "3",
			img:"IMG_20200501_032337.jpg",
			id: 3
		},
		{
			name: "4",
			img:"IMG_20200506_063558.jpg",
			id: 4
		},
		{
			name: "5",
			img:"IMG_20200515_182654.jpg",
			id: 5
		},
		{
			name: "6",
			img:"IMG_20200520_160154.jpg",
			id: 6
		},
		{
			name: "7",
			img:"IMG_20200530_140554.jpg",
			id: 7
		},
		{
			name: "8",
			img:"IMG_20200610_030344.jpg",
			id: 8
		},
		{
			name: "9",
			img:"IMG_20200612_183949.jpg",
			id: 9
		},
		{
			name: "10",
			img:"IMG_20200612_190026.jpg",
			id: 10
		},
		{
			name: "11",
			img:"IMG_20200619_192330.jpg",
			id: 11
		},
		{
			name: "12",
			img:"received_314054643103370.jpeg",
			id: 12
		}
	];

	Memory.init(cards);
})();
