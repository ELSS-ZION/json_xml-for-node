const path = require('path')
const fs = require('fs')
const json_xml = require('json_xml')

var xmlStr = fs.readFileSync(path.join(__dirname, 'xml.tmp'), 'utf-8')
var jsonObj = json_xml.xml2json(xmlStr)
console.log(jsonObj)
xmlStr = json_xml.json2xml(jsonObj)
console.log(xmlStr)