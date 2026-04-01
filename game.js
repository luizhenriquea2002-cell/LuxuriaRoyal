const symbols = ["🍒","💎","7️⃣","🔥","💰"];

function rand() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}

async function saldo() {
  const res = await fetch("/saldo", {
    headers: { Authorization: localStorage.getItem("token") }
  });

  const data = await res.json();

  document.getElementById("saldo").innerText =
    "Saldo: " + data.saldo;
}

async function girar() {
  document.getElementById("r1").innerText = rand();
  document.getElementById("r2").innerText = rand();
  document.getElementById("r3").innerText = rand();

  const res = await fetch("/play", {
    method: "POST",
    headers: { Authorization: localStorage.getItem("token") }
  });

  const data = await res.json();

  document.getElementById("resultado").innerText =
    data.win ? "🔥 GANHOU" : "❌ PERDEU";

  saldo();
}

saldo();
