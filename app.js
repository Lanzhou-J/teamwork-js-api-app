const fetch = require('node-fetch');
const readline = require('readline-sync');
const { parseString } = require('xml2js');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');
const util = require("util")
// const authorsFunc = require('./author');

clear();
console.log(
  chalk.cyan(
    figlet.textSync('Readapi', { horizontalLayout: 'full' }),
  ),
);
console.log('Hi, what do you want to do?');
console.log('Please select a number:');
console.log(chalk.blue('1. See authors'));
console.log(chalk.blue('2. Search(authors/books/ISBN)'));

let menu = readline.question('> ');

// while (menu !== 'exit'){
if (menu === '1') {
  console.log('Hi, which author do you want to check?');
  console.log('Please select from the options:');

  console.log(chalk.blue(' - Charles Dickens'));
  console.log(chalk.blue(' - George Orwell'));
  console.log(chalk.blue(' - Haruki Murakami'));
  console.log(chalk.blue(' - Herman Melville'));
  console.log(chalk.blue(' - JK Rowling'));
  console.log(chalk.blue(' - Margaret Atwood'));
  console.log(chalk.blue(' - Margaret Mitchell'));
  console.log(chalk.blue(' - Mo Yan'));
  console.log(chalk.blue(' - Stefan Zweig'));
  console.log(chalk.blue(' - Virginia Woolf'));

  function getUserInput() {
    const input = readline.question('> ');
    const authors = ['Charles Dickens', 'George Orwell', 'Haruki Murakami', 'Herman Melville', 'JK Rowling', 'Margaret Atwood', 'Margaret Mitchell', 'Mo Yan', 'Stefan Zweig', 'Virginia Woolf'];
    function CustomError(message) {
      this.message = message;
      this.name = 'UserInputError';
    }
    if (!authors.includes(input)) {
      throw new CustomError('That author not found');
    }
    return input;
  }

  try {
    let author = getUserInput();

    author = author.replace(' ', '_');

    const authorObj = {
      Charles_Dickens: '239579.Charles_Dickens',
      JK_Rowling: '1077326.J_K_Rowling',
      Stefan_Zweig: '25573.Stefan_Zweig',
      Margaret_Atwood: '3472.Margaret_Atwood',
      Haruki_Murakami: '3354.Haruki_Murakami',
      Mo_Yan: '121407.Mo_Yan',
      Virginia_Woolf: '6765.Virginia_Woolf',
      Herman_Melville: '1624.Herman_Melville',
      Margaret_Mitchell: '11081.Margaret_Mitchell',
      George_Orwell: '3706.George_Orwell',
    };

    const id = authorObj[author];
    const getAuthor = () => fetch(`https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=${id}`).then((response) => response.text()).then((data) => data)
      .catch((err) => console.log(err));

    const promises = [];
    promises.push(getAuthor());

    Promise.all(promises).then((response) => {
      const xml = response[0];
      parseString(xml, (err, result) => {
        console.log(result.GoodreadsResponse.author[0]);
      });
      console.log();
      console.log('🎉🎉🎉🎉🎉🎉🎉🎉');
      console.log(chalk.yellow(`Successfully get author information of ${author.replace('_', ' ')}! ✿ヽ(°▽°)ノ✿`));
      console.log('🎉🎉🎉🎉🎉🎉🎉🎉');
      console.log();
      console.log('Do you want to see the books of the author? (10 at most)');
      console.log(chalk.blue(' - yes/no'));
      const seeBooks = readline.question('> ');
      if (seeBooks === 'yes') {
        parseString(xml, (err, result) => {
          console.log(result.GoodreadsResponse.author[0].books[0].book);
        });
        console.log();
        console.log('🎉🎉🎉🎉🎉🎉🎉🎉');
        console.log(chalk.yellow(`Successfully get books written by ${author.replace('_', ' ')}! ✿ヽ(°▽°)ノ✿`));
        console.log('🎉🎉🎉🎉🎉🎉🎉🎉');
        console.log();
      } else {
        console.log(chalk.yellow('See you next time!'));
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}else if(menu === '2'){
  console.log("Enter your search query");
const search = readline.question("> ")
fetch(`https://www.goodreads.com/search/index.xml?key=cfyfMOfygbaO23YVVBiA&q=${search}`).then((response) => {
  return response.text()
}).then((data) => {
  parseString(data, function (err, result) {
    let books = result.GoodreadsResponse.search[0].results[0].work;
    // console.log(util.inspect(books, false, null, true));
    books.forEach(function(value, index) {
      console.log(chalk.yellow('----------------------------------'))
      console.log(`Title: ${value.best_book[0].title[0]}`)
      console.log(`Average rating: ${value.average_rating[0]}`)
    });
  });
})
}else {
  console.log("I don't understand!")
}
// }
