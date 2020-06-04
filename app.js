// import npm node-fetch module
const fetch = require("node-fetch");
// import npm xml2js module
const parseString = require("xml2js").parseString;
// import npm chalk module
const chalk = require("chalk");
// import npm inquirer module for option menu
const inquirer = require('inquirer');
const clear = require('clear');
const figlet = require('figlet');

clear();
console.log(
  chalk.cyan(
    figlet.textSync('Readapi', { horizontalLayout: 'full' })
  )
);

inquirer
  .prompt([
    {
      type:'list',
      name: 'toDoMenu',
      message: 'What do you want to do?',
      choices:['See authors','See books']
    },
  ])
  .then(answers => {
    console.info('Selection:', answers.toDoMenu);
    if(answers.toDoMenu==='See authors'){
      console.log('authors!');
      let id = authorObj.Charles_Dickens
      const getAuthor = () => {
      return fetch(`https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=${id}`).then(response => response.text()).then(data => data)
      .catch(err => console.log(err));}

const promises = []
promises.push(getAuthor())
      Promise.all(promises).then((response)=> {
    let xml=response[0]
    parseString(xml, function (err, result) {
    console.dir(result["GoodreadsResponse"]["author"][0].name);
  });
})
    }
  });

var authorObj = {
  Charles_Dickens:"239579.Charles_Dickens",
  J_K_Rowling:"1077326.J_K_Rowling",
  Stefan_Zweig:"25573.Stefan_Zweig"
};










