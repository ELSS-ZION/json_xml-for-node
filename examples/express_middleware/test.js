const path = require('path')
const fs = require('fs')
const express = require('express')
const request = require('request')
const json_xml = require('../../json_xml/json_xml')
const app = express()

app.use(json_xml.middleware)
app.post('/', (req, res) => {
    console.log(req.rawBody) // XML
    console.log(req.body) // JSON
    res.send('success')
})

app.listen(80, () => {
    var xmlStr = fs.readFileSync(path.join(__dirname, 'xml.tmp'), 'utf-8')
    request.post({
        url: 'http://localhost/',
        body: xmlStr,
        headers: {'Content-Type': 'text/xml'}
    }, (err, res, body) => {
        if (!err && res.statusCode == 200) {
            console.log(body)
        }
    })
})