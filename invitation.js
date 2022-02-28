const hexgen = require("hex-generator");
const fs = require("fs-extra");
const { join } = require("path");

const appendIdtoString = (id = "", string = "", start = 1) => {
    return (string.substring(0, start) + id + string.substring(start)).slice(0, 8)
}

class Invitation {
    constructor(cid, name, phone, email, nid) {
        var id = nid || hexgen(16).toUpperCase();
        var startIndex = Math.floor((Math.random() * 3) + 1); // index may start from 1 to 2
        var refCode = hexgen(16).toUpperCase();
        
        console.log(nid);
        console.log(startIndex);
        //

        this.creator = cid;
        this.invitator = name;
        this.phone = phone;
        this.email = email;
        this.id = id;
        this.startIndex = startIndex;
        this.referenceCode = appendIdtoString(id, refCode, startIndex);
        this.inviteeReferenceCode = [
            hexgen(16).toUpperCase(),
            hexgen(16).toUpperCase(),
        ];
        this.generatedInvites = this.getInvites();
    }

    static constructFromJson(json) {
        const { id, creator, generatedInvites, name, phone, email, invitator, startIndex, referenceCode, inviteeReferenceCode } = json;
        const invitation = new Invitation(creator, name, phone, email);
        invitation.id = id;
        invitation.invitator = invitator;
        invitation.startIndex = startIndex;
        invitation.referenceCode = referenceCode;
        invitation.inviteeReferenceCode = inviteeReferenceCode;
        invitation.generatedInvites = generatedInvites;

        return invitation;
    }

    getInvites() {
        // create Invites
        var invites = [];
        console.log(this);
        this.inviteeReferenceCode.forEach(refCode => {
            invites.push(appendIdtoString(this.id, refCode, this.startIndex));
        })

        return invites;
    }

    parseToJson() {
        return {
            creator: this.creator,
            id: this.id,
            name: this.invitator,
            phone: this.phone,
            startIndex: this.startIndex,
            referenceCode: this.referenceCode,
            inviteeReferenceCode: this.inviteeReferenceCode,
            generatedInvites: this.getInvites()
        };
    }

    createFile() {
        if (!fs.existsSync(join(__dirname, "database/invites", this.id + ".json"))) {
            fs.writeFileSync(join(__dirname, "database/invites", this.id + ".json"), JSON.stringify(this.parseToJson(), null, "\t"));
        }
    }

    markAsUsed(index, userId) {
        const invite = this.generatedInvites[index];

        if (invite) {
            const usedInvites = fs.readJSONSync(join(__dirname, "database/usedInvites.json"));
            if (!this.checkIfUsed(invite)) {
                usedInvites["0"].push({
                    usedFor: this.id,
                    creator: this.creator,
                    user: userId,
                    invite: invite
                });
            }

            fs.writeJSONSync(join(__dirname, "database/usedInvites.json"), {"0": usedInvites["0"]});
        }
    }

    getUnusedInvite() {
        for (let i = 0; i < this.generatedInvites.length; i++) {
            const invite = this.generatedInvites[i];
            
            console.log("checkIfUnused");
            console.log(invite);
            if (this.checkIfUsed(invite) == false) {
                console.log("used!")
                return {invite: invite, index: i, inviteeReference: this.inviteeReferenceCode[i]};
            }
        }

        return false;
    }

    checkIfUsed(referralCode) {
        const ifUsed = fs.readJSONSync(join(__dirname, "database/usedInvites.json"));
        var ifUsedInvite = false;

        console.log("checking if used:");
        console.log(referralCode)
        for (let i = 0; i < ifUsed["0"].length; i++) {
            console.log(ifUsed["0"][i].invite, referralCode)
            if (ifUsed["0"][i].invite == referralCode) {
                console.log("used");
                ifUsedInvite = true;
                break;
            }
        }

        return ifUsedInvite;
    }
    
    verifyInviteCode(inviteCode = "") {
        // verify if there is ID present
        const pattern = new RegExp(`(${this.id})`, "g");
        const match = pattern.exec(inviteCode);
        
        if (match && match.index == this.startIndex) {
            const refCodes = inviteCode.replace(this.id, "");
            const ifFound = this.inviteeReferenceCode.find(refCode => refCode === refCodes);
            if (checkIfUsed(inviteCode) == true)
                return false;

            if (ifFound) 
                return true;
        }

        return false;
    }
}

module.exports = Invitation