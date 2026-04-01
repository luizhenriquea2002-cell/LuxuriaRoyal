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
let saldo = 5000;

function atualizarSaldo() {
  document.getElementById("dados").innerHTML = "💰 Saldo: " + saldo;
}

function girarSlot() {
  if (saldo < 100) {
    alert("Saldo insuficiente");
    return;
  }

  saldo -= 100;

  const simbolos = ["💎","🔥","💰","🍀","👑"];
  let resultado = [];

  for (let i = 0; i < 3; i++) {
    resultado.push(simbolos[Math.floor(Math.random() * simbolos.length)]);
  }

  if (resultado[0] === resultado[1] && resultado[1] === resultado[2]) {
    saldo += 1000;
    alert("🎉 JACKPOT!");
  }

  document.getElementById("r1").innerText = resultado[0];
  document.getElementById("r2").innerText = resultado[1];
  document.getElementById("r3").innerText = resultado[2];

  atualizarSaldo();
}

atualizarSaldo();
