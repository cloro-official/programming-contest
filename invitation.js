const hexgen = require("hex-generator");
const fs = require("fs-extra");
const { join } = require("path");

const appendIdtoString = (id = "", string = "", start = 1) => {
    return (string.substring(0, start) + id + string.substring(start)).slice(0, 8)
}

class Invitation {
    constructor(name, phone, email) {
        var id = hexgen(16).toUpperCase();
        var startIndex = Math.floor((Math.random() * 3) + 1); // index may start from 1 to 2
        var refCode = hexgen(16).toUpperCase();
        
        console.log(startIndex);
        //

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
    }

    static constructFromJson(json) {

    }

    getInvites() {
        // create Invites
        var invites = [];
        this.inviteeReferenceCode.forEach(refCode => {
            invites.push(appendIdtoString(this.id, refCode, this.startIndex));
        })

        return invites;
    }

    parseToJson() {
        return {
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

    markAsUsed(index) {
        const invite = this.inviteeReferenceCode[index];

        if (invite) {
            const usedInvites = fs.readJSONSync(join(__dirname, "database/usedInvites.json"));
            usedInvites.push({
                id: this.id,
                invite: invite
            });

            fs.writeJSONSync(join(__dirname, "database/usedInvites.json"), usedInvites);
        }
    }

    getUnusedInvite() {
        for (let i = 0; i < this.inviteeReferenceCode.length; i++) {
            const invite = this.inviteeReferenceCode[i];

            if (!this.checkIfUsed(invite)) {
                return invite;
            }
        }

        return false;
    }

    checkIfUsed(referralCode) {
        const ifUsed = fs.readJSONSync(join(__dirname, "database/usedInvites.json"));
        const ifUsedInvite = ifUsed.find(usedInvite => usedInvite === referralCode);

        return ifUsedInvite ? true : false;
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