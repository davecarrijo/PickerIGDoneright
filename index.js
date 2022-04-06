//https://www.npmjs.com/package/dotenv
require("dotenv").config();

//https://www.npmjs.com/package/instatouch
const instaTouch = require("instatouch");

//https://nodejs.org/api/fs.html
const fs = require("fs");

//Scrape comments from a post and
//Exemplo, por este link: http://www.instagram.com/p/B7w0yffArc5/
//Neste exemplo o token/id do post vai ser 'B7w0yffArc5''ou pode ser o URL todo.
//o url esta no env file "PHOTO_ID"

async function getAllParticipants() {
  try {
    const options = {
      count: 1500,
      session: process.env.INSTAGRAM_SESSION_ID
    };
    const comments = await instaTouch.comments(process.env.PHOTO_ID, options);
    return comments.collector;
  } catch (error) {
    console.log(error);
  }
}

function pickWinner(participants) {
  const allParticipants = participants.length;
  const pickedToken = Math.floor(Math.random() * allParticipants);
  const pickedWinner = participants[pickedToken];
  return pickedWinner;
}

function writeGoldenToken(winner) {
  fs.writeFile(
    "goldenToken.json",
    JSON.stringify(winner, null, 2),
    function (err) {
      if (err) console.log(err);
    }
  );
}
async function main() {
  const participants = await getAllParticipants();
  const goldenToken = pickWinner(participants);
  writeGoldenToken(goldenToken);
}

main();
