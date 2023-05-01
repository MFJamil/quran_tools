<template>
        <v-card>
            <v-card-actions>
                <v-btn-toggle elevation="5" >
                    <v-btn density="compact" elevation="3" color="primary" icon="mdi-unfold-more-horizontal" @click="soraList=searchResult?.qtFiltered.map(so=>so.name)"></v-btn>
                    <v-btn density="compact" elevation="3" color="primary" icon="mdi-unfold-less-horizontal" @click="soraList=[]"></v-btn>
                </v-btn-toggle>
            
            </v-card-actions>
            <v-card-text>
                <v-expansion-panels
                    v-model="soraList"
                >
                    <v-expansion-panel
                        v-for="sora in searchResult?.qtFiltered" 
                        :key="sora.index"
                        color="primary"
                        :value="sora.name"
                    >
                    <v-expansion-panel-title class="soraText">
                        {{sora.index + ' . ' + sora.name + ' (' + sora.aya.length +  ')'}} </v-expansion-panel-title>
                    <v-expansion-panel-text :class="soraBGClass" >
                        <p>
                            <template 
                                v-for="aya in sora.aya" 
                                :key="aya.index">
                                <div                     
                                    v-if="searchResult?.searchText!==''" 
                                    v-html="styleSearchText(sora,aya)"
                                    >
                                </div>
                                
                                <span                     
                                    v-else
                                    class="ayaText"
                                >
                                {{ aya.text }} 
                                <span :class="'ayaNumber ' + ayaBGClass">{{composeAyaNumber(aya.index)}}</span>                                    
                                </span>

                            
                            </template>
                        </p>
                    </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>        
            </v-card-text>
        </v-card>
  </template>
  <script lang="ts">

  export default{
      name:'ExplanisionPanel',
      inheritAttrs: false,
      
  }
</script>

  
  <script lang="ts" setup>
    import {ref,onMounted,PropType} from 'vue'

    import {SearchResult} from '../service/SearchUtils';

    const props = defineProps(
        {
            searchResult:{
                reuired: true,
                type: Object as PropType<SearchResult>,
            }            
        }
    );
    
    let soraList = ref<Object|undefined>([]);
    let soraBGClass = ref('expSoraBG_3');
    let ayaBGClass =  ref('ayaNum_g');


    onMounted(()=>{
        /*
        window.onkeydown = (ev: KeyboardEvent): any => {
            handleKey(ev);
        }
        */

    });

    

    function handleKey(ev:any){
        let digitKey = ev.keyCode-48;
        console.log("Key Code Pressed : " + digitKey + " code: " + ev.code);
        console.log(ev);
        if (digitKey>0 && digitKey<10){
            soraBGClass.value = 'expSoraBG_' + digitKey;
        }else{
            ayaBGClass.value = 'ayaNum_' + ev.key;
        }
        

    }

    function styleSearchText(sora:any,aya:any){
        console.log("Style Search .......");
        console.log(sora);
        console.log(aya);
        
        

        const searchWords =  props.searchResult?.filteredAyas[sora.index][aya.index];
        let ayaText = aya.text;
        searchWords.forEach((curWord:string) => {
            console.log("Replacing : " + curWord);
            ayaText = ayaText.replaceAll(curWord, '<span class="foundText">' + curWord + '</span>')
        });        
        
        let result = `<span class="ayaText"> ${ayaText}</span>
            <span class="ayaNum_g ayaNumber">${composeAyaNumber(aya.index)}</span>`;
        
        
        
        //<span class="ayaNumber">﴿${aya.index}﴾</span>
        //console.log(result);
        return  result;
       
    }

    function composeAyaNumber(AyaNumber:string){
        //return '\u06DD' + AyaNumber + '\u06DD';
        return '\uFD3F' + AyaNumber + '\uFD3E';
    }


    
  </script>
   <style>
   .ayaText{
     color: black;
     font-size: large;
     font-family: hafs;
     font-size: 22px;
     text-align: justify;
     direction: rtl;   
     padding: 4px;
     margin: 2px;  
     line-height: 2.35em;
   }

   .ayaNumber{
     white-space: nowrap;
    color: blue;
    cursor: pointer;    
    font-size: x-large;
   }

   .foundText{
     color: red;
   }

   .soraText{
    font-size: x-large;
     font-family: hafs;
   }

   .expSoraBG_1{background-color: rgb(208, 216, 247);}
   .expSoraBG_2{background-color: rgb(229, 252, 179);}
   .expSoraBG_3{background-color: rgb(245, 233, 208);}
   .expSoraBG_4{background-color: rgb(180, 214, 237);}
   .expSoraBG_5{background-color: rgb(247, 252, 227);}
   .expSoraBG_6{background-color: rgb(250, 246, 237);}
   .expSoraBG_7{background-color: rgb(240, 223, 221);}
   .expSoraBG_8{background-color: rgb(249, 250, 220);}
   .expSoraBG_9{background-color: rgb(252, 217, 223);}

   .ayaNum_g{color:green;}
   .ayaNum_r{color:red;}
   .ayaNum_b{color:blue;}
   .ayaNum_w{color:white;}
   .ayaNum_l{color:black;}
   .ayaNum_y{color:gray;}
   .ayaNum_o{color:orange;}
   .ayaNum_z{color:brown}


  </style>
  