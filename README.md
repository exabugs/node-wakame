node-wakame
===========

MeCab connector for Node.js


```
$ echo '今日は残業' | mecab
今日	名詞,副詞可能,*,*,*,*,今日,キョウ,キョー,,
は	助詞,係助詞,*,*,*,*,は,ハ,ワ,,
残業	名詞,サ変接続,*,*,*,*,残業,ザンギョウ,ザンギョー,,
EOS
```


Usage
-----

Installation command is `npm install node-wakame`.

### Quick example

```javascript
var should = require("should")
  , MeCab = require('node-wakame').MeCab
  ;

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
```
