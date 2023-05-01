import fullQt from '../resources/quranText.json'
import clearQt from '../resources/quranCleanText.json'


    export type Word={
        word: string;
        sora:number;
        aya:number;
        };


    export type Group={
        word: string;
        selected: boolean;
        count:number;
        };
 
    export type SearchResult={
        searchText:string;
        qt:any[];
        qtFiltered:any[];
        filteredAyas:any[];
        words:Word[];
        totalCount:number;
        ayaCount:number;
        group:Group[];
        report:string;
};

export default class SearchUtils{
    private places = [
        'موضع',
        'موضع واحد',
        'موضعين',
        'مواضع'
    ];
    private ayas = [
        'أية',
        'أية واحدة',
        'آيتين',
        'آيات'
    ];
    private soras = [
        'سورة',
        'سورة واحدة',
        'سورتين',
        'سور'
    ];


// عَلَيْهِمْ 
// غَيْرِ
// ماء ئ
// بقرة صفراء
// الرحمن الرحيم
// "ماء"

    public filterResult(result:SearchResult){
        
        result.ayaCount = 0;
        result.totalCount = 0;
        this.fillFilteredAyas(result);
        result.qtFiltered = [];
        Object.keys(result.filteredAyas).forEach((sora:any)=>{
            console.log("Working on Sora : " + sora);
            const sourceSora = result.qt.filter(s=>s.index===sora)[0];
            const targetSora = {...sourceSora};
            targetSora.aya=[];
            Object.keys(result.filteredAyas[sora]).forEach(aya=>{
                console.log("Working on Aya : " + aya);
                targetSora.aya.push(sourceSora.aya.filter((a:any)=>a.index===aya)[0]);

            });
            result.qtFiltered.push(targetSora);
        });
        console.log(" ************************");
        console.log(result.qtFiltered);
        result.report = this.createReport(result);
        
    }




    public searchAll(searchVal:string):SearchResult{
        searchVal = searchVal.trim();
        const multiWordMatch = searchVal.split(' ').length>1;
        const exactMatch = searchVal.startsWith('"') && searchVal.endsWith('"');
        const qt = this.isClear(searchVal)?clearQt:fullQt;
        searchVal = exactMatch?searchVal.substring(1,searchVal.length-1):searchVal;
        console.log("Search text : " + searchVal + " Mutli Word search check : " + multiWordMatch + " exact Matching check : " + exactMatch);
        for (const curWord of searchVal.split(' ')){
            console.log(curWord);
        }

        let totalCount = 0;
        const result:SearchResult ={
            searchText: searchVal,
            qt:[],
            qtFiltered:[],
            filteredAyas:[],
            words:[],
            totalCount:0,
            ayaCount:0,
            group:[],
            report:''
        };
        for (let s=0;s<qt.length;s++){
            const sora = {...qt[s]};
            sora.aya=[];
            for (let a=0;a<qt[s].aya.length;a++){
                let words:string[]|null = [];
                if (exactMatch){
                    words = this.extractExact(qt[s].aya[a].text,searchVal,multiWordMatch);   
                }else{
                    if (multiWordMatch){
                        
                        for (const curWord of searchVal.split(' ')){
                            const answer = this.extractAll(qt[s].aya[a].text,curWord);
                            if (answer!==null) words = words.concat(answer);
                        }

                    }else{
                        words = this.extractAll(qt[s].aya[a].text,searchVal);
                    }
                }
                if ((words!==null)&&(words.length>0)){
                    totalCount += words.length;
                    sora.aya.push(qt[s].aya[a]);
                    words.forEach(word =>{
                        result.words.push({'word': word,sora: +sora.index,aya: +qt[s].aya[a].index});
                        const grp = result.group.filter(g => g.word===word);
                        if (grp.length===0){
                            result.group.push({word: word,'selected': true , count:1});
                        }else{
                            grp[0].count += 1;
                        }
                    });
                    result.ayaCount += 1;

                }
            }
            if (sora.aya.length>0)
                result.qt.push(sora);
            
        }
        result.totalCount = totalCount;
        
        //console.log(result);
        result.qtFiltered = result.qt;
        result.qt = qt;
        result.report = this.createReport(result);
        this.fillFilteredAyas(result);
        return result;
    }

    public isClear(wordVal:String){
        for (let i=0;i<wordVal.length;i++)
            if (wordVal.charCodeAt(i)>1610) return false;
        return true;
    }

    private fillFilteredAyas(result:SearchResult){
        let grp:Group;
        const filteredAyas:any={};
        for (grp of result.group){
            if (grp.selected){
                const wordAyas:Word[] = result.words.filter(wrd => wrd.word===grp.word);
                for (const curWord of wordAyas){
                    if (filteredAyas[curWord.sora]===undefined){
                        filteredAyas[curWord.sora] = {};
                    }
                    if (filteredAyas[curWord.sora][curWord.aya]===undefined){
                        result.ayaCount += 1;
                        filteredAyas[curWord.sora][curWord.aya] = [];
                    }
                    result.totalCount += 1;
                    filteredAyas[curWord.sora][curWord.aya].push(curWord.word);
                }
            }
        }
        console.log(filteredAyas);
        console.log(Object.keys(filteredAyas));
        result.filteredAyas = filteredAyas;

    }

    public createReport(searchResult:any){
        if (searchResult.totalCount===0) return 'لم نتمكن من أيجاد شيء يرجى التأكد من محتوى البحث ';
        // ' موضع واحد'  'موضعين'  
        const report = 'تم أيجاد ' 
            + this.composeReportUnit(searchResult.totalCount,this.places)
            + ' في '
            + this.composeReportUnit(searchResult.ayaCount,this.ayas)
            + ' في '
            + this.composeReportUnit(searchResult.qtFiltered.length,this.soras);
        console.log("Sora number is : " + searchResult.qtFiltered.length);
        return report;
        
    }

    private composeReportUnit(count:number,texts:Array<string>){
        return (count>2? count + ' ':'') + ((count>0&&count<4)?texts[count]:
                             (count>2&&count<11)?texts[3]:
                             texts[0]);
    }

    private extractAll(sourceVal:string,searchVal:string){
        searchVal = searchVal.trim();
        
        if (searchVal.indexOf('\u0621')!==-1) {
            searchVal = searchVal.replaceAll("\u0621","[\u0621\u0626\u0624]");
        }
        const re = new RegExp("(" + searchVal + ")");
        const wordList = sourceVal.split(" ").filter((elem, index)=>{
            return re.test(elem);
        })
        return wordList;
    }
    private extractExact(sourceVal:string,searchVal:string,multi=false){
        if (!multi)
            return sourceVal.split(' ').filter(wrd => wrd===searchVal);
        return sourceVal.match(searchVal);
        /* Below Code did not work, neet to keep it for later check
        if (searchVal.indexOf('\u0621')!==-1) {
            searchVal = searchVal.replaceAll("\u0621","[\u0621\u0626\u0624]");
        }*/
        //const re = new RegExp( "/([^ء-ي]" + searchVal + "[^ء-ي])/g" );
        //const re = new RegExp( searchVal,"gi");
        
        //console.log("Matching against : " + "/" + searchVal + "/g");
        //return sourceVal.match("/([^ء-ي]" + searchVal + "[^ء-ي])/g");
        //return sourceVal.match(re);
        /*        
        const wordList = sourceVal.split(" ").filter((elem, index)=>{
            return re.test(elem);
        })
        if (wordList.length!==0){
            console.log("--------------------------------------------");
            console.log(wordList);
        }
        return wordList;
        */
    }

}