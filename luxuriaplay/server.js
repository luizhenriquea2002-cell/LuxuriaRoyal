function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 ESSA LINHA É A MAIS IMPORTANTE
    req.userEmail = decoded.email;

    next();
  } catch {
    res.sendStatus(403);
  }
}
