"use strict";
exports.__esModule = true;
var fs = require("fs");
var pdf = require("pdf-parse");
var pdf2json_1 = require("pdf2json");
var PdfParser = /** @class */ (function () {
    function PdfParser() {
    }
    PdfParser.prototype.init = function () {
        console.log("Quranm Tool backend started ......");
        var dataBuffer = fs.readFileSync("src/resources/para_1.pdf");
        pdf(dataBuffer).then(function (data) {
            console.log(data.numpages);
            console.log(data.text);
            console.log(data.numrender);
            // PDF info
            console.log(data.info);
            // PDF metadata
            console.log(data.metadata);
            // PDF.js version
            // check https://mozilla.github.io/pdf.js/getting_started/
            console.log(data.version);
        });
    };
    //*
    PdfParser.prototype.pdf2json = function () {
        var pdfParser = new pdf2json_1["default"]();
        pdfParser.on("pdfParser_dataError", function (errData) { return console.error(errData.parserError); });
        pdfParser.on("pdfParser_dataReady", function (pdfData) {
            fs.writeFile("src/resources/para_1.json", JSON.stringify(pdfData), function () { });
        });
        pdfParser.loadPDF("src/resources/para_1.pdf");
    };
    return PdfParser;
}());
exports["default"] = PdfParser;
var parserInstance = new PdfParser();
parserInstance.init();
//parserInstance.pdf2json();
