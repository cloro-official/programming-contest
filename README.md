# PROGRAMMING CONTEST
Programming Contest Solution for Arts &amp; Tech Week CIIT 2022

## Team Kani
### Members:
- Manuel Angelo Rodriguez Abanilla (Leader)
- Ken Adrian Alupit
- Patrick Miguel Babala

## Problem
An event organizer is planning to organize a large gathering for people that are interested in technology. To make this event viral, they want to have an invite system that allows one (1) invited person to invite two (2) more, just like how the Katipunan Triangle System works.

However, they do not want to go into the trouble of verifying each of the attendee’s inviter during the event because it will be tedious and time consuming. To mitigate this, they thought of a code system (like QR or Barcode) that can be traced back from its inviter.

Your task now is to create one. Let me give you an example on how it should work. Let’s start with the topmost inviter - the organizer. Let’s assign a Hexadecimal value 6E053DFE as the inviter’s code.

Now, the organizer invites Joanna and Alyanna. We can make their codes start with the last four (4) places of the organizer’s code, 3DFE. Joanna’s code is 3DFE5BCB, and Alyanna’s will be 3DFEDBLE.
Now, we can now determine Joanna’s reference value, which is 5BCB. Alyanna’s reference value is DBLE.

The system should be able to generate two (2) invite codes if an inviter inputs his/hers, and the codes should be saved on the node. The same system should also verify if the invite code is valid or not. 

A separate system should be created to present this linking system.

## System
This project is created using `Node.js 16.14.0`, with the packages [hex-generator](https://www.npmjs.com/package/hex-generator) and [jsbarcode](https://www.npmjs.com/package/jsbarcode). It creates an `Invitation` class that generates a reference code and two invites, where the reference code is appended to a randomized index of each invite.

## Initialization
1. Run `npm update` to install all necessary packages.
2. Do `node index.js` to run the UI.
