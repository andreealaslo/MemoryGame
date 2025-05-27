# MemoryGame
Memore game implemented using Web Components
![image](https://github.com/user-attachments/assets/b297ec66-8da1-4916-8fc1-6aef32a98e25)
A simple and fun Memory Match Game built as a Web Component using native JavaScript and Shadow DOM. Match all the emoji pairs to win the game!

---

## 🎯 Features

- 🧩 16 emoji cards (8 pairs) shuffled randomly
- 🔁 Click to flip and match cards
- 🕒 Move counter and timer
- ▶️ "Start" and "Play Again" buttons
- 🎉 Victory message on win
- ♻️ Responsive, encapsulated styles using Shadow DOM

---
## 📦 Project Structure

The project includes the following files:

- `index.html` – Sample usage of the component.
- `memory-game.js` – Custom element definition and logic.

---
## 📥 Installation

1. Clone or download this repository:

```bash
https://github.com/your-username/memory-match-game.git
```

2. Add the component to your HTML file:
```bash
<script src="./memory-game.js"></script>
```

3. Use the custom element in your HTML:
```bash
<memory-game></memory-game>
```
4. Full example code
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <script src="./memory-game.js"></script>
  <title>Memory Game</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      margin: 2rem;
    }
  </style>
</head>
<body>
  <h1>Test your memory, win the game</h1>
  <memory-game></memory-game>
</body>
</html>
```
---
## 🚀 Usage
1. Open index.html in any modern browser. Click on the "Start" button to begin the game
![image](https://github.com/user-attachments/assets/4870478f-2e67-47e3-941e-37d4e4bfabfe)

2. Click on two cards to reveal the emoji.
![image](https://github.com/user-attachments/assets/f7e1f7be-8593-4f95-ab3d-12ecd91d039d)

3. Match all pairs to win the game.
![image](https://github.com/user-attachments/assets/b297ec66-8da1-4916-8fc1-6aef32a98e25)
4. Refresh or click "Play Again" to restart.

---
🛠️ Future Development
1. Difficulty Levels: Add support for "Easy", "Medium", and "Hard" levels (different grid sizes).
2. Timer Mode: Introduce a countdown or stopwatch to increase challenge and replayability.
3. Card Themes: Allow users to choose card themes (animals, flags, emojis, icons).

---
📚 Documentation - 
Built using https://developer.mozilla.org/en-US/docs/Web/Web_Components




