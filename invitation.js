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
class Invitation {
    constructor() {
        var id = hexgen(16);
        var refCode = hexgen(16);

        //
        this.id = id.toUpperCase();
        this.referenceCode = (id + refCode).toUpperCase();
        this.inviteCode = [
            (id + hexgen(16)).toUpperCase(),
            (id + hexgen(16)).toUpperCase(),
        ];
    }

    getInvites() {
        return this.inviteCode;
    }

    getReferenceCode() {
        return this.referenceCode;
    }

    getId() {
        return this.id;
    }

    verifyInviteCode(inviteCode) {
        // Ternary Operation
        return inviteCode.toLowerCase().includes(this.id.toLowerCase()) ? true : false;
    }
}

module.exports = Invitation