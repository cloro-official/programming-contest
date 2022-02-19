const hexgen = require("hex-generator");
/*
    Generate 16 bit Hexadecimal (16 = 4 characters)
    Append to generated 16 bit Hexadecimal to ID to create a 32 bit Hexadecimal value.

    Goal:
    Make it so the ID generated must be placed on the reference code on different string indexes.
    This will make it so the ID is not easily found, and must always not be in the same index (first index).

    We can get the reference code of each invite by removing the ID, where it will always return a 4 character string.

    Then we can verify through RegEx or string.includes().
*/
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