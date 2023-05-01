"use strict";
exports.__esModule = true;
var fs = require("fs");
var pdf = require("pdf-parse");
//import PDFParser from "pdf2json";
var PdfParser = /** @class */ (function () {
    function PdfParser() {
    }
    PdfParser.prototype.init = function () {
        console.log("Quranm Tool backend started ......");
        var dataBuffer = fs.readFileSync("src/resources/para_1.pdf");
        pdf(dataBuffer).then(function (data) {
            console.log(data.numpages);
            //console.log(data.text);
            console.log(data.numrender);
            // PDF info
            console.log(data.info);
            // PDF metadata
            console.log(data.metadata);
            // PDF.js version
            // check https://mozilla.github.io/pdf.js/getting_started/
            console.log(data.version);
            for (var _i = 0, _a = data.text.split("\n"); _i < _a.length; _i++) {
                var line = _a[_i];
                console.log(line);
            }
        });
    };
    return PdfParser;
}());
exports["default"] = PdfParser;
var parserInstance = new PdfParser();
parserInstance.init();
//parserInstance.pdf2json();
