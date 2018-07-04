
//dependencies:
var express = require('express');
const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

//set up server:
var app = express();
var port = process.env.PORT || 5050;

app.use(express.static('public'));

//Listener
app.listen(port, function() {
  console.log('thx for listening on channel', port);
});

function generateOptions(url) {
  return {
    uri: url,
    transform: function(body) {
      return cheerio.load(body);
    }
  };
}

app.get('/stuff', function(req, res) {
  const ops = generateOptions('http://crystalmaker.com/support/tutorials/crystalmaker/atomic-radii/index.html');
  // console.log('hi there');
  let nums = [0,1,2,3,4,5,6,7,8,9];

  rp(ops).then(data => {
    let elements = [];
    let getNext = false;
    let elt = {};

    data('td').each((i, elem) => {

      for (let i=0; i < elem.children.length; i++) {
        let child = elem.children[i];
        if (child.data) {
          // Check whether it's a new element:
          if (!nums.map(s => s.toString()).includes(child.data[1]) && !nums.map(s => s.toString()).includes(child.data[0])) {
            elt.name = child.data;
            getNext = true;
            continue;
          }
          if (getNext) {
            // console.log("data: ", child.data);
            elt.number = child.data;
            elements.push(elt);
            getNext = false;
            elt = {};
          }
        }
      }
      // elem.children.forEach(child => {


      // });

    });
    // console.log(allStrings);
    res.send(elements);

  }).catch(err => {
    console.log(err);
  });
});
