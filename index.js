// Initialized by CLORO
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs-extra");
const { join } = require("path");

const router = express.Router();

const jsbarcode = require("jsbarcode");
const hexgen = require("hex-generator");

const InvitationClass = require("./invitation.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

router.get("/", (req, res) => {
    res.sendFile("./html/index.html", { root: __dirname });
})

router.get("/none", (req, res) => {
    res.sendFile("./html/none.html", { root: __dirname });
})

router.get("/modules/jsbarcode.js", (req, res) => {
    res.sendFile("./modules/jsbarcode.js", { root: __dirname });
})

router.post("/index", (req, res) => {
    const { referral } = req.body

    if (referral) {
        const exists = fs.existsSync(join(__dirname, "database", referral + ".json"));
        res.send({success: exists});

        res.end();
    }
})

app.use("/", router);
app.listen(process.env.port || 3000);
console.log("Verification code listening on port 3000");