/*
import fs from "fs";
import PDFParser from "pdf2json";

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("src/resources/para_1.json", JSON.stringify(pdfData));
});

pdfParser.loadPDF("src/resources/para_1.pdf");
*/

import pdf2excel from "pdf-to-excel";


try {
  const options = {
    // when current pdf page number changes call this function(optional)
    onProcess: (e) => console.warn(`${e.numPage} / ${e.numPages}`),
    // pdf start page number you want to convert (optional, default 1)
    start: 1,
    // pdf end page number you want to convert (optional, default )
    end: 2,
  }

  pdf2excel.genXlsx('src/resources/para_1.pdf', 'src/resources/para_1.xlsx', options);
} catch (err) {
  console.error(err);
}