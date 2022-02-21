// Initialized by CLORO
const express = require('express');
const bodyParser = require('body-parser');
const fs = require("fs-extra");
const { join } = require("path");

const router = express.Router();

const jsbarcode = require("jsbarcode");
const hexgen = require("hex-generator");

const InvitationClass = require("./invitation.js");
const UserClass = require("./user.js");
const { use } = require('express/lib/application');
const User = require('./user.js');

const usedInvitePath = join(__dirname, "../../data/usedInvites.json");

fs.ensureDirSync(join(__dirname, "database/invites")); 
fs.ensureDirSync(join(__dirname, "database/users")); 

fs.ensureFileSync(usedInvitePath);
fs.writeFileSync(usedInvitePath, JSON.stringify({ "0": [] }, null, "\t"));

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

router.get("/register", (req, res) => {
    res.sendFile("./html/register.html", { root: __dirname });
})

router.get("/registered", (req, res) => {
    res.sendFile("./html/registered.html", { root: __dirname });
})

router.get("/alreadyregistered", (req, res) => {
    res.sendFile("./html/alreadyregistered.html", { root: __dirname });
})

router.get("/", (req, res) => {
    res.sendFile("./html/index.html", { root: __dirname });
})

router.post("/mark-invite-used", (req, res) => {
    const { user_id, index, referral, creator } = req.body;
    const ifUsed = fs.readJSONSync(join(__dirname, "database/usedInvites.json"));
    const inviteJSON = fs.readJSONSync(join(__dirname, "database/invites", referral + ".json"));
    const invite = inviteJSON.generatedInvites[index];

    var exist = false
    for (let i = 0; i < ifUsed["0"].length; i++) {
        if (ifUsed["0"][i].invite == invite) {
            exist = true
            break;
        }
    }

    if (!exist) 
        ifUsed["0"].push({
            usedFor: referral,
            creator: creator,
            user: user_id,
            invite: invite
        })

    fs.writeFileSync(join(__dirname, "database/usedInvites.json"), JSON.stringify({"0": ifUsed["0"]}, null, "\t"));
})

router.post("/get-class", (req, res) => {
    const { id, user_id } = req.body;
    const filePath = join(__dirname, "database/invites", id + ".json");
    console.log(id);

    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        const invitation = JSON.parse(data);
        const invitationClass = InvitationClass.constructFromJson(invitation);
        const { invite, index } = invitationClass.getUnusedInvite();
        
        res.send({success: true, freeInvite: invite, creator: invitationClass.creator, index: index, user_id: user_id, referral: invitationClass.id});
    }

    res.send({success: false})
})

router.post("/register", (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const existingUser = UserClass.findForSimilar(name, phone, email)
        if (existingUser) {
            res.send({success: true, registered: true, class: existingUser})
            return
        }

        const user = new UserClass(name, phone, email);
        user.createFile();

        res.send({success: true, class: user.parseToJson()});
    } catch (error) {
        console.log(error);
        res.send({success: false, error: error.message});
    }
})

router.post("/create", (req, res) => {
    const { id } = req.body;

    try {
        const exist = fs.existsSync(join(__dirname, "database/users", id + ".json"));
        if (!exist) throw new Error("User doesn't exist");

        const json = fs.readJSONSync(join(__dirname, "database/users", id + ".json"));
        const user = UserClass.constructFromJson(json);

        const invitation = new InvitationClass(user.id, user.name, user.phone, user.email);
        invitation.createFile();
        
        res.send({success: true, class: invitation.parseToJson()});
    } catch (error) {
        console.log(error);
        res.send({success: false, error: error});
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