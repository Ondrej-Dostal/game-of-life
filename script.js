function play(player) {
  const computer = Math.floor(Math.random() * 5);

  document.getElementById("your-img").src = `images/${player}.png`;
  document.getElementById("comp-img").src = `images/${computer}.png`;

  document.getElementById("result").textContent =
    getResult(player, computer);
}

function getResult(p, c) {
  if (p === c) return "Remíza!";

  const win = {
    0: [1, 4], // kámen
    1: [2, 4], // nůžky
    2: [0, 3], // papír
    32: [0, 1], // spok
    4: [2, 3]  // tapír
  };

  return win[p].includes(c) ? "Výhra! 🎉" : "Prohra 😢";
}