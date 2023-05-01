<template>
    <v-container class="fill-height">
      <v-responsive class="d-flex align-center text-center fill-height">
        <v-row>
            <v-col md="8" >
                <searchPanel  @searchUpdate="searchUpdated"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col md="12">
                <expanisionPanel :searchResult="searchResult" />
            </v-col>
    </v-row>
      </v-responsive>
    </v-container>
  </template>
    <script lang="ts">

    export default{
        name:'QuranPanel',
        inheritAttrs: false,
        
    }
  </script>
  <script lang="ts" setup>
    import searchPanel from './SearchPanel.vue';
    import expanisionPanel from './Expanision_Panel.vue';
    import fullQt from '../resources/quranText.json'
    import {ref} from 'vue'

    import {SearchResult} from '../service/SearchUtils';

    let searchResult = ref<SearchResult>({
                    searchText: '',
                    qt: fullQt,
                    qtFiltered: fullQt,
                    filteredAyas: [],
                    words: [],
                    totalCount: 0,
                    ayaCount: 0,
                    group: [],
                    report: ''
                });


    function searchUpdated(newSearchResult:SearchResult){
        searchResult.value = newSearchResult;
    }
    


    
  </script>
