const symbols = ["🍒","💎","7️⃣","🔥","💰"];

async function carregarSaldo() {
  const token = localStorage.getItem("token");

  const res = await fetch("/saldo", {
    headers: { Authorization: token }
  });

  const data = await res.json();

  document.getElementById("saldo").innerText =
    "Saldo: " + data.saldo + " coins";
}

function randomSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function animar(id, delay) {
  return new Promise(resolve => {
    let count = 0;

    const interval = setInterval(() => {
      document.getElementById(id).innerText = randomSymbol();
      count++;

      if (count > 10) {
        clearInterval(interval);
        resolve(document.getElementById(id).innerText);
      }
    }, delay);
  });
}

async function girar() {
  const r1 = animar("r1", 100);
  const r2 = animar("r2", 150);
  const r3 = animar("r3", 200);

  await Promise.all([r1, r2, r3]);

  const token = localStorage.getItem("token");

  const res = await fetch("/play", {
    method: "POST",
    headers: { Authorization: token }
  });

  const data = await res.json();

  document.getElementById("resultado").innerText =
    data.win ? "🔥 GANHOU!" : "❌ PERDEU";

  carregarSaldo();
}

carregarSaldo();
