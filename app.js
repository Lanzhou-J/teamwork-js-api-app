const fetch = require("node-fetch")
const parseString = require("xml2js").parseString;

const getAuthor = () => {
return fetch("https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=1077326.J_K_Rowling").then(response => response.text()).then(data => data) 
.catch(err => console.log(err));}

const promises = []
promises.push(getAuthor())

Promise.all(promises).then((response)=> {
  let xml=response[0]
  parseString(xml, function (err, result) {
    console.dir(result["GoodreadsResponse"]["author"][0]["books"][0]["book"][0]);
  });
})



// console.log(xmldata);

// getAuthor()