// Initialized by CLORO
const express = require('express');
const router = express.Router();

const hexgen = require("hex-generator");

const InvitationClass = require("./invitation.js");

const app = express();

router.get("/invitee", (req, res) => {
    res.sendFile("./html/invitee.html", { root: __dirname });
})

router.get("/completed", (req, res) => {
    res.sendFile("./html/completed.html", { root: __dirname });
})

router.get("/register", (req, res) => {
    res.sendFile("./html/register.html", { root: __dirname });
})

router.get("/adminpanel", (req, res) => {
    res.sendFile("./html/adminpanel.html", { root: __dirname });
})

app.use("/", router);
app.listen(process.env.port || 3000);
console.log("Verification code listening on port 3000");