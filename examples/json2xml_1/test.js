const json_xml = require('../../json_xml')

var str = json_xml.json2xml({
    a: 12
})
console.log(str)