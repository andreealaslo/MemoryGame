class MemoryGame extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.cards = [];
    this.flippedCards = [];
    this.moves = 0;
    this.time = 0;
    this.timer = null;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector('#start-btn').addEventListener('click', () => this.startGame());
    this.shadowRoot.querySelector('#play-again-btn').addEventListener('click', () => this.startGame());
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .controls {
          margin-bottom: 1rem;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 100px);
          grid-gap: 10px;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .card {
          width: 100px;
          height: 100px;
          background: #b4c0f7;
          font-size: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          user-select: none;
          border-radius: 8px;
        }

        .flipped, .matched {
          background: #fff;
          border: 2px solid #333;
        }

        button {
          margin: 0 10px;
          padding: 8px 16px;
          font-size: 1rem;
          cursor: pointer;
          background: #b4c0f7
        }

        .message {
          font-weight: bold;
          font-size: 1.2rem;
          color: green;
        }
      </style>

      <div class="controls">
        <span>Moves: <span id="moves">0</span></span>
        <span> | Time: <span id="time">0</span> sec</span>
        <br/>
        <button id="start-btn">Start</button>
        <button id="play-again-btn" disabled>Play Again</button>
      </div>

      <div class="grid" id="card-grid"></div>
      <div class="message" id="win-message"></div>
    `;
  }

  startGame() {
    this.resetGame();
    this.createDeck();
    this.renderCards();
    this.shadowRoot.querySelector('#start-btn').disabled = true;
    this.shadowRoot.querySelector('#play-again-btn').disabled = false;
    this.startTimer();
  }

  resetGame() {
    this.cards = [];
    this.flippedCards = [];
    this.moves = 0;
    this.time = 0;
    clearInterval(this.timer);
    this.updateMoves();
    this.updateTime();
    this.shadowRoot.querySelector('#win-message').textContent = '';
  }

  createDeck() {
    const values = ['🍎', '🍌', '🍇', '🍓', '🍒', '🥝', '🍉', '🍍'];
    const deck = [...values, ...values].sort(() => 0.5 - Math.random());

    this.cards = deck.map((value, index) => ({
      id: index,
      value,
      matched: false,
    }));
  }

  renderCards() {
    const grid = this.shadowRoot.querySelector('#card-grid');
    grid.innerHTML = '';

    this.cards.forEach(card => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.dataset.id = card.id;
      div.textContent = '?';
      div.addEventListener('click', () => this.handleCardClick(div));
      grid.appendChild(div);
    });
  }

  handleCardClick(cardEl) {
    const cardId = parseInt(cardEl.dataset.id);
    const card = this.cards.find(c => c.id === cardId);

    if (card.matched || this.flippedCards.includes(card) || this.flippedCards.length === 2) {
      return;
    }

    this.flipCard(cardEl, card);
    this.flippedCards.push(card);

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.updateMoves();
      setTimeout(() => this.checkMatch(), 700);
    }
  }

  flipCard(cardEl, card) {
    cardEl.textContent = card.value;
    cardEl.classList.add('flipped');
  }

  checkMatch() {
    const [card1, card2] = this.flippedCards;
    const el1 = this.shadowRoot.querySelector(`[data-id="${card1.id}"]`);
    const el2 = this.shadowRoot.querySelector(`[data-id="${card2.id}"]`);

    if (card1.value === card2.value) {
      card1.matched = card2.matched = true;
      el1.classList.add('matched');
      el2.classList.add('matched');
      this.checkWin();
    } else {
      el1.textContent = '?';
      el2.textContent = '?';
      el1.classList.remove('flipped');
      el2.classList.remove('flipped');
    }

    this.flippedCards = [];
  }


  checkWin() {
    if (this.cards.every(c => c.matched)) {
      clearInterval(this.timer);
      this.shadowRoot.querySelector('#win-message').textContent = `🎉 You won in ${this.moves} moves and ${this.time} seconds!`;
    }
  }

  updateMoves() {
    this.shadowRoot.querySelector('#moves').textContent = this.moves;
  }

  startTimer() {
    this.updateTime();
    this.timer = setInterval(() => {
      this.time++;
      this.updateTime();
    }, 1000);
  }

  updateTime() {
  const minutes = Math.floor(this.time / 60);
  const seconds = this.time % 60;
  const padded = (n) => n.toString().padStart(2, '0');
  this.shadowRoot.querySelector('#time').textContent = `${padded(minutes)}:${padded(seconds)}`;
}
}

customElements.define('memory-game', MemoryGame);
