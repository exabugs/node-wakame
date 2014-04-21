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
```

### Example 1

```javascript
    var process = MeCab.parse("今日は残業。明日も残業。");
```

### Example 2

```javascript
    var process = MeCab.parse(fs.createReadStream("path.to.text_file"));
```

