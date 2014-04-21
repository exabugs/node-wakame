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

    var process = MeCab.parse("今日は残業");

    var result = [];

    process.on('record', function (record, index) {
      result.push(record);
    });

    process.on('error', function (error) {
      done(error);
    });

    process.on('end', function (count) {
      should.equal(result[0][0], "今日");
      should.equal(result[1][0], "は");
      should.equal(result[2][0], "残業");
      done(null, result, count);
    });

  })

});

