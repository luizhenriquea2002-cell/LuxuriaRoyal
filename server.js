const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 ISSO AQUI É O MAIS IMPORTANTE
app.use(express.static(__dirname));

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@luxuria.com" && password === "123456") {
    const token = jwt.sign({ email }, "segredo123");
    return res.json({ token });
  }

  res.status(401).json({ error: "Login inválido" });
});

// 🔥 ROTA PRINCIPAL (SEM ISSO FICA BRANCO)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
