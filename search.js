const fetch = require("node-fetch")
const parseString = require("xml2js").parseString;
const readline = require("readline-sync")
const util = require("util")


console.log("Enter your search query");
const search = readline.question("> ")
fetch(`https://www.goodreads.com/search/index.xml?key=cfyfMOfygbaO23YVVBiA&q=${search}`).then((response) => {
  return response.text()
}).then((data) => {
  parseString(data, function (err, result) {
    let books = result.GoodreadsResponse.search[0].results[0].work;
    console.log(util.inspect(books, false, null, true));
    books.foreach(function(value, index) {
      
    });
  });
})


