const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// usuário fake
const users = [
  { email: "admin@luxuria.com", password: "123456" }
];

let usersData = {};

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Erro login" });

  const token = jwt.sign({ email }, "segredo123");

  res.json({ token });
});

// AUTH
function auth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, "segredo123");
    req.userEmail = decoded.email;
    next();
  } catch {
    res.sendStatus(403);
  }
}

// SALDO
app.get("/saldo", auth, (req, res) => {
  const email = req.userEmail;

  if (!usersData[email]) {
    usersData[email] = { saldo: 1000 };
  }

  res.json({ saldo: usersData[email].saldo });
});

// JOGO
app.post("/play", auth, (req, res) => {
  const email = req.userEmail;

  if (!usersData[email]) {
    usersData[email] = { saldo: 1000 };
  }

  const chance = Math.random();
  let premio = chance > 0.8 ? 200 : -50;

  usersData[email].saldo += premio;

  res.json({
    win: premio > 0,
    saldo: usersData[email].saldo
  });
});

// ROTAS HTML
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
