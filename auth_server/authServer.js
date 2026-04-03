const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const SECRET_KEY = "mysecret";

/*GENERATE TOKEN*/
app.post("/generate-token", (req, res) => {

  const { username, password } = req.body;

  // Dummy users database
  const users = {
    sinchana: { password: "123", roles: ["ADMIN"] },
    verifier: { password: "123", roles: ["VERIFIER"] },
    manager: { password: "123", roles: ["MANAGER"] },
    rep: { password: "123", roles: ["REPRESENTATIVE"] }
  };

  const user = users[username];

  if (!user || user.password !== password) {
    return res.status(401).json({
      message: "Invalid username or password"
    });
  }

  const token = jwt.sign(
    { username: username, roles: user.roles },
    "mysupersecretkey",
    { expiresIn: "15m" }
  );

  res.json({
    token: token
  });

});

/* -------------------------------
   VERIFY TOKEN
--------------------------------*/
app.post('/verify-token', (req, res) => {

  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ valid: false });
  }

  try {

    const decoded = jwt.verify(token, 'mysupersecretkey');

    res.json({
      valid: true,
      user: decoded
    });

  } catch (error) {

    res.json({
      valid: false
    });

  }

});
/* -------------------------------
   START SERVER
--------------------------------*/
app.listen(4000, () => {
    console.log("Auth Server running on port 4000");
});