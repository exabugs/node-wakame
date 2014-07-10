/*
 * MeCab
 * @author exabugs@gmail.com
 */

"use strict";

var spawn = require('child_process').spawn
  , csv = require('csv')
  , StemFilter = require('./stem')
  ;


/**
 * parse
 * @param input string or stream
 * @returns {*|CursorStream|null}
 */
exports.parse = function (input) {

  var stem = new StemFilter();

  var mecab = spawn('mecab');

  var process = csv().from.stream(mecab.stdout, {delimiter: '\t', quote: null});

  stem.pipe(mecab.stdin);

  if (input.pipe) {
    input.pipe(stem);
  } else {
    stem.write(input.toString());
    stem.end();
  }

  process.transform(function (record, index, next) {
    if (1 < record.length) {
      var result = [record[0]];
      next(null, result.concat(record[1].split(',')));
    } else {
      next(null, record);
    }
  });

  return process;
};

