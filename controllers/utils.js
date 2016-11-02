'use strict';

var request = require('request'),
    htmlparser = require('htmlparser2'),
    chalk = require('chalk');

var getDefinition = function(req, res, next) {
    request('https://www.vocabulary.com/dictionary/' + req.params.word, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(chalk.green('200: ') + 'Retrieved entry for ' + req.params.word);
            var divFound = false;
            var mainDivContent = ''
            var children = 0;
            var parser = new htmlparser.Parser({
                onopentag: function(name, attribs) {
                    if (name === 'div' && attribs.class === 'main') {
                        divFound = true;
                    } else if (divFound) {
                    	children++;
                    }
                    if (divFound) {
                    	mainDivContent += '<' + name + ' ';
                    	for (var key in attribs) {
                    		mainDivContent += key + '="' + attribs[key] + '" ';
                    	}
                    	mainDivContent += '>';
                    }
                },
                ontext: function(text) {
                    if (divFound) {
                        mainDivContent += text.replace(/^[\n\r]+|[\n\r]+$/g,'');
                    }
                },
                onclosetag: function(name) {
                	if (divFound && children > 0) {
                		children--;
                    	mainDivContent += '</' + name + '>';
                	} else if (divFound && children == 0 && name =='div') {
                		divFound = false;
                		mainDivContent += '</div>';
                		console.log(chalk.green('200: ') + 'Definition sent');
                	}
                }
            }, {
                decodeEntities: true
            });
            parser.write(body);
            parser.end();
            res.send(mainDivContent);
        } else {
            console.log(chalk.red(response.statusCode + ': ') + error);
        }
    });
}

module.exports = {
    getDefinition: getDefinition
}
