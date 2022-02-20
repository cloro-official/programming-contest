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
router.get("/generated", (req, res) => {
    res.sendFile("./html/generated.html", { root: __dirname });
})

router.get("/adminpanel", (req, res) => {
    res.sendFile("./html/adminpanel.html", { root: __dirname });
})

router.get("/", (req, res) => {
    res.sendFile("./html/index.html", { root: __dirname });
})

router.post("/get-class", (req, res) => {
    const { id } = req.body;
    const filePath = join(__dirname, "database/invites", id + ".json");
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const invitation = JSON.parse(data);
        res.send({success: true, class: invitation});
    }

    res.send({success: false})
})

router.post("/create", (req, res) => {
    const { name, phone, email } = req.body;

    try {
        const invitation = new InvitationClass(name, phone, email);
        invitation.createFile();
        
        InvitationClasses[invitation.id] = invitation;
        res.send({success: true, class: invitation.parseToJson()});
    } catch (error) {
        res.send({success: false});
    }
});

router.get("/none", (req, res) => {
    res.sendFile("./html/none.html", { root: __dirname });
})

router.get("/usedup", (req, res) => {
    res.sendFile("./html/usedup.html", { root: __dirname });
})

router.get("/modules/jsbarcode.js", (req, res) => {
    res.sendFile("./modules/jsbarcode.js", { root: __dirname });
})

router.post("/index", (req, res) => {
    const { referral } = req.body

    if (referral) {
        const exists = fs.existsSync(join(__dirname, "database/invites", referral + ".json"));
        res.send({success: exists});

        res.end();
    }
})

app.use("/", router);
app.listen(process.env.port || 3000);
console.log("Verification code listening on port 3000");