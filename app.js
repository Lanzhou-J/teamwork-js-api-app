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

console.log(chalk.blue(" - Charles Dickens"))
console.log(chalk.blue(" - George Orwell"))
console.log(chalk.blue(" - Haruki Murakami"))
console.log(chalk.blue(" - Herman Melville"))
console.log(chalk.blue(" - JK Rowling"))
console.log(chalk.blue(" - Margaret Atwood"))
console.log(chalk.blue(" - Margaret Mitchell"))
console.log(chalk.blue(" - Mo Yan"))
console.log(chalk.blue(" - Stefan Zweig"))
console.log(chalk.blue(" - Virginia Woolf"))

let author = readline.question("> ")
author = author.replace(" ","_")

var authorObj = {
  Charles_Dickens:"239579.Charles_Dickens",
  JK_Rowling:"1077326.J_K_Rowling",
  Stefan_Zweig:"25573.Stefan_Zweig",
  Margaret_Atwood:"3472.Margaret_Atwood",
  Haruki_Murakami:"3354.Haruki_Murakami",
  Mo_Yan:"121407.Mo_Yan",
  Virginia_Woolf:"6765.Virginia_Woolf",
  Herman_Melville:"1624.Herman_Melville",
  Margaret_Mitchell:"11081.Margaret_Mitchell",
  George_Orwell:"3706.George_Orwell"
};

let id = authorObj[author]
const getAuthor = () => {
return fetch(`https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=${id}`).then(response => response.text()).then(data => data)
.catch(err => console.log(err));}

const promises = []
promises.push(getAuthor())

Promise.all(promises).then((response)=> {
  let xml=response[0]
  parseString(xml, function (err, result) {
    console.log(result["GoodreadsResponse"]["author"][0]);
  });
  console.log();
  console.log('🎉🎉🎉🎉🎉🎉🎉🎉')
  console.log(chalk.yellow(`Successfully get author information of ${author.replace("_"," ")}! ✿ヽ(°▽°)ノ✿`))
  console.log('🎉🎉🎉🎉🎉🎉🎉🎉')
  console.log();
  console.log("Do you want to see the books of the author?");
  console.log(chalk.blue('yes/no'));
  let seeBooks = readline.question("> ")
  if(seeBooks === "yes"){
      parseString(xml, function (err, result) {
    console.log(result["GoodreadsResponse"]["author"][0].books[0].book);
  });
  }else{
    console.log(chalk.yellow('See you next time!'));
  }

})



// console.log(xmldata);

// getAuthor()