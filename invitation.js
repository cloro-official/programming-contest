const hexgen = require("hex-generator");

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
        return inviteCode.toLowerCase().includes(this.id.toLowerCase()) ? true : false;
    }
}

module.exports = Invitation