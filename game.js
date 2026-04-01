function girarSlot() {
  const reels = [
    document.getElementById("r1"),
    document.getElementById("r2"),
    document.getElementById("r3")
  ];

  const simbolos = ["💎","🔥","💰","🍀","👑"];

  reels.forEach((r, i) => {
    let count = 0;

    const interval = setInterval(() => {
      r.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
      count++;

      if (count > 15 + i * 5) {
        clearInterval(interval);
      }
    }, 100);
  });
}
