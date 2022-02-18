// Initialized by CLORO
const hexgen = require("hex-generator");
const InvitationClass = require("./invitation.js");

const NewInvitationClass = new InvitationClass();
const invites = NewInvitationClass.getInvites();

// Prototyping Test
console.log(NewInvitationClass.getId());
console.log(NewInvitationClass.getReferenceCode());
console.log(NewInvitationClass.getInvites());

for (var i = 0; i < 5; i++)
    console.log(NewInvitationClass.verifyInviteCode(hexgen(32)));

console.log(NewInvitationClass.verifyInviteCode(invites[0]));