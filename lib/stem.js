/*
 * StemFilter
 * @author exabugs@gmail.com
 */

"use strict";

var stream = require('stream')
  , util = require('util')
  , StringDecoder = require('string_decoder').StringDecoder
  ;

function StemFilter() {
  this.decoder = new StringDecoder();
}

util.inherits(StemFilter, stream.Stream);

StemFilter.prototype.write = function (data) {
  if ('string' !== typeof data) {
    data = this.decoder.write(data);
  }
  data = data.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
  data = data.replace(/[A-Z]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0x20);
  });
  this.emit('data', data);
}

StemFilter.prototype.end = function () {
  this.emit('close');
}

StemFilter.prototype.pipe = function (dest) {
  stream.Stream.prototype.pipe.apply(this, arguments);
};

module.exports = StemFilter;
