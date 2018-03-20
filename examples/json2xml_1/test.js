const json_xml = require('../../json_xml')

var str = json_xml.json2xml({
    a: 1
})
console.log(str)