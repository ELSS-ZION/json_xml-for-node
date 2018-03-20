exports.json2xml = function (jsonObj) {
    if (typeof (jsonObj) == 'number') {
        return jsonObj
    }
    if (typeof (jsonObj) == 'string') {
        return '<![CDATA[' + jsonObj + ']]>'
    }
    var xmlstr = ''
    for (var key in jsonObj) {
        if (jsonObj[key] instanceof Array) {
            jsonObj[key].forEach((element) => {
                xmlstr += '<' + key + '>'
                xmlstr += arguments.callee(element)
                xmlstr += '</' + key + '>'
            })
            continue
        }
        xmlstr += '<' + key + '>'
        xmlstr += arguments.callee(jsonObj[key])
        xmlstr += '</' + key + '>'
    }
    return xmlstr
}

exports.xml2json = function (xmlStr) {
    xmlStr = xmlStr.replace(/^\s*<\?xml[\S\s]*?\?>/, '')

    var obj = {}
    while (/<([^>\s]+)[\S\s]*?>/.test(xmlStr)) {
        var tagName = RegExp.$1
        if (/\s*\/\s*>$/.test(RegExp['$&'])) {
            xmlStr = xmlStr.replace(RegExp['$&'], '')
            obj[tagName] = ''
            continue
        }

        if (/!\[CDATA\[([\S\s]*?)\]\]/.test(xmlStr)) {
            xmlStr = xmlStr.replace(/<!\[CDATA\[([\S\s]*?)\]\]>/, '$1')
            continue
        }

        var regex = '<' + tagName + '[\\S\\s]*?>([\\S\\s]*?)<\\/' + tagName + '>'
        regex = new RegExp(regex)
        xmlStr = xmlStr.replace(regex, '')
        
        var subNode = arguments.callee(RegExp.$1)
        
        if (typeof (obj[tagName]) != 'undefined') {
            if (obj[tagName] instanceof Array) {
                obj[tagName].push(subNode)
                continue
            }
            obj[tagName] = [obj[tagName], subNode]

            continue
        }

        obj[tagName] = subNode
    }

    if (!Object.getOwnPropertyNames(obj).length) {
        return xmlStr
    }

    return obj
}

exports.middleware = (req, res, next) => {
    if (req._body) return next()
    if (req.method == 'GET' || req.method == 'HEAD') return next()
    if (!req.is('text/xml')) return next()
    
    req._body = true

    req.rawBody = ''

    req.on('data', function (chunk) {
        req.rawBody += chunk;
    })

    req.on('end', function () {
        req.body = exports.xml2json(req.rawBody)
        next()
    })
}