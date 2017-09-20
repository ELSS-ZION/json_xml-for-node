# json_xml

XML to JSON, JSON to XML

## XML to JSON
``` xml
<xml>
  <appid>wx2421b1c4370ec43b</appid>
  <attach><![CDATA[attach1]]></attach>
  <attach>attach2</attach>
  <bank_type>1</bank_type>
  <sign></sign>
  <fee_type><is_subscribe><![CDATA[Y]]></is_subscribe></fee_type>
</xml>
```
```
const json_xml = require('json_xml')
var jsonObj = json_xml.xml2json(xmlStr)
```
``` js
{ xml:
   { appid: 'wx2421b1c4370ec43b',
     attach: [ 'attach1', 'attach2' ],
     bank_type: '1',
     sign: '',
     fee_type: { is_subscribe: 'Y' } } }
```

## JSON to XML
``` js
{ xml:
   { appid: 'wx2421b1c4370ec43b',
     attach: [ 'attach1', 'attach2' ],
     bank_type: '1',
     sign: '',
     fee_type: { is_subscribe: 'Y' } } }
```
```
const json_xml = require('json_xml')
var jsonObj = json_xml.xml2json(jsonObj)
```
``` xml
<xml>
  <appid>wx2421b1c4370ec43b</appid>
  <attach><![CDATA[attach1]]></attach>
  <attach>attach2</attach>
  <bank_type>1</bank_type>
  <sign></sign>
  <fee_type><is_subscribe><![CDATA[Y]]></is_subscribe></fee_type>
</xml>
```

## Example
+ [json_xml examples](https://github.com/ELSS-ZION/json_xml-for-node/tree/master/example)