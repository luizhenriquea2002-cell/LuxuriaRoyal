const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// 🔥 SERVIR FRONT (HTML, CSS, JS)
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

// 🔥 ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// DASHBOARD
app.get("/dashboard", (req, res) => {
  res.sendFile(__dirname + "/dashboard.html");
});

// 🚀 START DO SERVIDOR (FALTAVA ISSO!)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
