let usersData = {};

app.post("/play", auth, (req, res) => {
  const email = req.userEmail;

  if (!usersData[email]) {
    usersData[email] = { saldo: 1000 };
  }

  const chance = Math.random();
  let win = false;
  let premio = 0;

  if (chance > 0.9) {
    premio = 300;
    win = true;
  } else {
    premio = -50;
  }

  usersData[email].saldo += premio;

  res.json({ win, saldo: usersData[email].saldo });
});

app.get("/saldo", auth, (req, res) => {
  const email = req.userEmail;

  if (!usersData[email]) {
    usersData[email] = { saldo: 1000 };
  }

  res.json({ saldo: usersData[email].saldo });
});
