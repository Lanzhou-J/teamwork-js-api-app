//hello
const fetch = require("node-fetch")
const parseString = require("xml2js").parseString;

// const getAuthor = async () => {
//   const response = await fetch("https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=1077326.J_K_Rowling")
//   // console.log(response)
//   const data = await response.text()
//   const jsondata = JSON.parse(data)
//   console.log(data)
// }
// var xmldata = [];
const getAuthor = () => {
return fetch("https://www.goodreads.com/author/show.xml?key=cfyfMOfygbaO23YVVBiA&id=1077326.J_K_Rowling").then(response => response.text()).then(data => data
  // xmldata.push(data)
  // console.log(data)
  // const result = parseString(data, function (err, result) {
  //   result
  // });
  //print it out
  // console.log(result)
  // console.log(xmldata)
  ) 
.catch(err => console.log(err));}

const promises = []
promises.push(getAuthor())

Promise.all(promises).then((response)=> {
  let xml=response[0]
  parseString(xml, function (err, result) {
    console.dir(result["GoodreadsResponse"]["author"][0]["books"][0]["book"]);
  });

  })



// console.log(xmldata);

// getAuthor()