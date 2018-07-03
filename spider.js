var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require("mkdirp");

// 页数
var i = 1;
// 地址
var url = 'http://www.66rpg.com/list/ranking';
// 存储目录
var dir = './images';
// 创建目录
mkdirp(dir, function (err) {
  if (err) {
    console.log(err);
  }
});

// 请求数据
function startRequest(url) {
  var data = [];
  request(url, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      const $ = cheerio.load(body);
      $('body').find('#search_result').children().each(function () {
        var imgSrc = $(this).find('dl dt .lazy_org_img').attr('data-original');
        var src = imgSrc.substr(0, imgSrc.length - 5)
        var ttl = $(this).find('dl dd h4 a').attr('title');
        data.push({
          title: ttl,
          imgSrc: src
        });
        // console.log('正在下载:' + imgSrc);
        // var fn = Math.floor(Math.random() * 100000) + src.substr(-4, 4);
        // download(src, dir, fn);
        // console.log('下载完成');
      })
      console.log(data);
    }
  })
  console.log(data);
  return data;
}

// 下载
var download = function (url, dir, filename) {
  request.head(url, function (err, res, body) {
    request(url).pipe(fs.createWriteStream(dir + "/" + filename));
  });
};

var data = startRequest(url);

console.log(data);
