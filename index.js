const fetch = require('node-fetch');
const cheerio = require('cheerio');
// eslint-disable-next-line unicorn/prefer-node-protocol
const fs = require('fs');
const request = require('request');

const getHtml = async () => {
  const response = await fetch(
    'https://memegen-link-examples-upleveled.netlify.app/',
  );
  const body = await response.text();
  const htmlT = cheerio.load(body);

  const arr = [];

  htmlT('img').each(function (i, element) {
    arr.push(element.attribs.src);
  });

  // for (let obj in htmlT('html')) {
  // console.log(obj.attribs.src);}

  for (let i = arr.length - 1; i > 9; i--) {
    arr.pop();
  }
  console.log(arr);
  const download = function (uri, filename, callback) {
    request.head(uri, function (err, res) {
      console.log('content-type:', res.headers['content-type']);
      console.log('content-length:', res.headers['content-length']);

      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  for (let i = 0; i < 10; i++) {
    download(arr[i], './memes/' + [i] + 'meme.jpg', function () {
      console.log('done');
    });
  }
};

getHtml();
// getBody();
