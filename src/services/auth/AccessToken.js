const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

function createAccessToken(userId) {
  // Access Token mit dem Inhalt der User Id erstellen
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });

  return accessToken;
}

function decodeAccessToken(accessToken) {
  // Den Inhalt des Access tokens dekodieren
  const decodedToken = jwt.verify(accessToken, JWT_SECRET);

  return decodedToken;
}

module.exports = { createAccessToken, decodeAccessToken };
