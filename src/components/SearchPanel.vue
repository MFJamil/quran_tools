<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-title class="checkText">البحث</v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-row>
                    <v-col>
                        <v-text-field
                            density="compact"
                            variant="outlined"
                            label=""
                            append-inner-icon="mdi-magnify"
                            single-line
                            hide-details
                            v-model="search"
                            
                            @click="checkSearch"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row><v-col>
                    <v-chip 
                    v-for="grp in searchResult.group" 
                    :key="grp.word" 
                    color="primary" 
                    text-color="black"
                    size="x-large">
                    {{ grp.word + ' (' + grp.count + ')' }} 
                    
                    <v-icon 
                        style="margin-right: 5px;" 
                        size="small" 
                        @click="filterChanged(grp)"
                        :color="grp.selected?'success':'error'"
                    >
                        {{grp.selected?'mdi-check-circle-outline':'mdi-close-circle-outline'}}
                    </v-icon>
                    
                    
                    </v-chip>
                </v-col></v-row>
                <v-row v-show="searchResult.qt!==undefined "><v-col md="8">
                    <v-checkbox color="primary"  v-model="checkAll">
                        <template v-slot:label>
                            <span class="checkText"  >أختيار كلي</span>
                        </template>
                    </v-checkbox> 
                </v-col></v-row>                

                <v-row><v-col>
                    <span class="checkText">{{ searchResult.report }}</span> 
                </v-col></v-row>                
                
                <!--span v-if="getSearchResultLength()!=='' ">تم أيجاد {{getSearchResultLength()}} </span--> 
        </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
  </template>
  <script lang="ts">

  export default{
      name:'SearchPanel',
      inheritAttrs: false,
      
  }
</script>

  <script lang="ts" setup>
    import {ref,watch,onMounted} from 'vue'

    import SearchUtils,{Group,Word,SearchResult} from '../service/SearchUtils';

    const emit = defineEmits(['searchUpdate']);
    let search = ref('');
    let searchUtils = new SearchUtils ();
    let searchResult = ref<SearchResult>({});
    let checkAll= ref(true);

    onMounted(()=>{

    });

    watch(()=>search.value,(newValue,oldValue)=>{
        console.log("Got Search Updated , from '" + oldValue + "' to '" + newValue + "'");
        searchResult.value = searchUtils.searchAll(newValue);
        emit('searchUpdate',searchResult.value);

    });
    watch(()=>checkAll.value,(newValue,oldValue)=>{
        for (let grp of searchResult.value.group) grp.selected = newValue ; 
        searchUtils.filterResult(searchResult.value);
        emit('searchUpdate',searchResult.value);
    });

    function filterChanged(grp:Group){
        grp.selected = !grp.selected;
        console.log("Filter Changed called ......");
        searchUtils.filterResult(searchResult.value);
        emit('searchUpdate',searchResult.value);
    }

    function checkSearch(){
        let val = search.value;
        console.dir("Selected value is : " + val + " " );
        let bytes = [];
        for (var i=0;i<val.length;i++)
            bytes.push(val.charCodeAt(i).toString(16));
        console.dir(bytes);
        
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
   .checkText{
    font-weight: bold;
    font-size: 20px;
   }
  </style>
  