const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet"); // For security

// to be removed
process.setMaxListeners(20);

//initialise the express app
const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
); // For security

//Enable All CORS Requests
app.use(cors());

// Body-parser middleware usage for req.body
app.use(express.json({ limit: "50mb" }));

//Express session
app.use(
  session({
    secret: 123,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);

// Next small code section is for deployment to azure web app
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log(`Server stared on port ${PORT}`);
});
