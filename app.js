const fetch = require("node-fetch")
const readline = require("readline-sync")
const parseString = require("xml2js").parseString;
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

clear();
console.log(
  chalk.cyan(
    figlet.textSync('Readapi', { horizontalLayout: 'full' })
  )
);

console.log("Hi, which author do you want to check?")
console.log("Please select from the options:")
console.log("JK Rowling")
console.log("Charles Dickens")
console.log("Stefan Zweig")
const author = readline.question("> ")

const getAuthor = () => {
return fetch("https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=1077326.J_K_Rowling").then(response => response.text()).then(data => data) 
.catch(err => console.log(err));}

const promises = []
promises.push(getAuthor())

Promise.all(promises).then((response)=> {
  let xml=response[0]
  parseString(xml, function (err, result) {
    console.dir(result["GoodreadsResponse"]["author"][0].name);
  });
})



// console.log(xmldata);

// getAuthor()