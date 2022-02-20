const hexgen = require("hex-generator");
const fs = require("fs-extra");
const { join } = require("path");

const appendIdtoString = (id = "", string = "", start = 1) => {
    return (string.substring(0, start) + id + string.substring(start)).slice(0, 8)
}

class Invitation {
    constructor() {
        var id = hexgen(16).toUpperCase();
        var startIndex = Math.floor((Math.random() * 3) + 1); // index may start from 1 to 2
        var refCode = hexgen(16).toUpperCase();
        
        console.log(startIndex);
        //
        this.id = id;
        this.startIndex = startIndex;
        this.referenceCode = appendIdtoString(id, refCode, startIndex);
        this.inviteeReferenceCode = [
            hexgen(16).toUpperCase(),
            hexgen(16).toUpperCase(),
        ];
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
        return JSON.stringify({
            id: this.id,
            startIndex: this.startIndex,
            referenceCode: this.referenceCode,
            inviteeReferenceCode: this.inviteeReferenceCode
        }, null, "\t");
    }

    createFile() {
        if (!fs.existsSync(join(__dirname, "database", this.id + ".json"))) {
            fs.writeFileSync(join(__dirname, "database", this.id + ".json"), this.parseToJson());
        }
    }
    
    verifyInviteCode(inviteCode = "") {
        // verify if there is ID present
        const pattern = new RegExp(`(${this.id})`, "g");
        const match = pattern.exec(inviteCode);
        
        if (match && match.index == this.startIndex) {
            const refCodes = inviteCode.replace(this.id, "");
            const ifFound = this.inviteeReferenceCode.find(refCode => refCode === refCodes);

            if (ifFound) 
                return true;
        }

        return false;
    }
}

module.exports = Invitation