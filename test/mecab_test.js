/**
 * MeCab
 * @author exabugs@gmail.com
 */

"use strict";

var should = require("should")
  , MeCab = require('../index.js')
  ;

describe('MeCab', function () {

  it('MeCab', function (done) {

    var process = MeCab.parse("今日は残業。明日も残業。");

    var result = {};

    process.on('record', function (record, index) {
      if (record[1] === '名詞') {
        var count = result[record[0]];
        result[record[0]] = count ? ++count : 1;
      }
    });

    process.on('error', function (error) {
      done(error);
    });

    process.on('end', function (count) {
      result.should.eql({ '今日': 1, '残業': 2, '明日': 1 });
      done(null, result, count);
    });

  });

});

