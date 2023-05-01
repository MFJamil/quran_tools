import * as fs from 'fs';
import pdf from 'pdf-parse'
//import PDFParser from "pdf2json";
export default class PdfParser{
    
    constructor(){}

    public init(){
        console.log("Quranm Tool backend started ......");
        const dataBuffer = fs.readFileSync("src/resources/para_1.pdf");  
        pdf(dataBuffer).then((data:any)=>{
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


        for (let line of data.text.split("\n")){
            console.log(line);
        }

        });    
    }
    /*
    public pdf2json(){
        const pdfParser = new PDFParser();
        pdfParser.on("pdfParser_dataError", (errData:any) => console.error(errData.parserError) );
        pdfParser.on("pdfParser_dataReady", pdfData => {
            fs.writeFile("src/resources/para_1.json", JSON.stringify(pdfData),()=>{});
        });
    
        pdfParser.loadPDF("src/resources/para_1.pdf");

    }
    //*/

}

const parserInstance = new PdfParser();
parserInstance.init();
//parserInstance.pdf2json();
