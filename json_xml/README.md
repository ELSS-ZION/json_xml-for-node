# json_xml

  + XML to JSON
  + JSON to XML
  + express middleware( req.body: JSON, req.rawBody: XML )

---
## XML to JSON

```js
const json_xml = require('json_xml')
var jsonObj = json_xml.xml2json(xmlStr)
```
### TYPE 1
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
``` js
{ xml:
   { appid: 'wx2421b1c4370ec43b',
     attach: [ 'attach1', 'attach2' ],
     bank_type: '1',
     sign: '',
     fee_type: { is_subscribe: 'Y' } } }
```
### TYPE 2
``` xml
<?xml version="1.0" encoding="utf-8"?>
<ROOT xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="JobSendedDescription">
  <RetCode>Sucess</RetCode>
  <JobID>159142093</JobID>
  <OKPhoneCounts>1</OKPhoneCounts>
  <StockReduced>1</StockReduced>
  <ErrPhones />
</ROOT>
```
``` js
{ ROOT:
   { RetCode: 'Sucess',
     JobID: '159142093',
     OKPhoneCounts: '1',
     StockReduced: '1',
     ErrPhones: '' } }
```
---
## JSON to XML
```js
const json_xml = require('json_xml')
var jsonObj = json_xml.xml2json(jsonObj)
```
``` js
{ xml:
   { appid: 'wx2421b1c4370ec43b',
     attach: [ 'attach1', 'attach2' ],
     bank_type: '1',
     sign: '',
     fee_type: { is_subscribe: 'Y' } } }
```

``` xml
<xml>
  <appid><![CDATA[wx2421b1c4370ec43b]]></appid>
  <attach><![CDATA[attach1]]></attach>
  <attach><![CDATA[attach2]]></attach>
  <bank_type><![CDATA[1]]></bank_type>
  <sign><![CDATA[]]></sign>
  <fee_type>
    <is_subscribe><![CDATA[Y]]></is_subscribe>
  </fee_type>
</xml>
```

---
## As Middleware
```js
const express = require('express')
const app = express()
const app = express()

app.use(json_xml.middleware)
app.post('/', (req, res) => {
    console.log(req.rawBody) // XML
    console.log(req.body) // JSON
    res.send('success')
})
```

---
## Examples
+ [json_xml examples](https://github.com/ELSS-ZION/json_xml-for-node/tree/master/examples)