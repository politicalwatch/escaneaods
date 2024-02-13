<template>
  <div class="o-grid">
    <div class="o-grid__col u-12">
      <h5>Distribución de los resultados:</h5>
      <scanner-list-viz-container :styles="styles" :result="result" />
    </div>
    <div class="o-grid__col u-12 u-margin-bottom-10">
      <ScannerBarchart
        :result="this.result"
        :resultToCompare="resultToCompare"
        :styles="styles"
      />
    </div>
    <div v-if="result.tags.length > 15" class="o-grid__col u-12 u-text-center">
      <ScannerWordsCloud
        :result="result"
        :maxResults="tagsInWordCloud"
        :styles="styles"
      />
    </div>
    <div class="o-grid__col u-12">
      <h5>Resultados detallados:</h5>
      <p v-if="result.topics.length > 9">
        Aquí solo te mostramos 10 resultados de {{ result.tags.length }}, para
        ver el resto descarga el archivo.
      </p>
      <p v-else>También puedes obtener los datos descargando el archivo.</p>
      <ScannerTable :result="result" />
    </div>
    <div class="o-grid__col u-12 u-margin-top-4">
      <json-excel
        :data="csvItems"
        id="downloadCSV"
        type="xls"
        class="c-button c-button--icon-right c-button--primary"
      >
        Descarga tus resultados
        <span class="c-icon c-icon--type-download">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="16"
            fill="none"
            viewBox="0 0 12 16"
          >
            <path
              fill="#2D4252"
              d="M12 5.647H8.571V0H3.43v5.647H0l6 6.588 6-6.588zm-12 8.47V16h12v-1.882H0z"
            ></path>
          </svg>
        </span>
      </json-excel>
      <tipi-message type="info" icon>
        Los resultados se descargarán en formato Excel.
      </tipi-message>
    </div>
  </div>
</template>

<script>
import { TipiMessage, TipiCsvDownload } from '@politicalwatch/tipi-uikit';
import ScannerWordsCloud from '@/components/scanner-wordscloud.vue';
import ScannerSunburst from '@/components/scanner-sunburst.vue';
import ScannerBarchart from '@/components/scanner-barchart.vue';
import ScannerTable from '@/components/scanner-table.vue';
import ScannerLegend from '@/components/scanner-legend.vue';
import ScannerListVizContainer from '@/components/ScannerList/ScannerListVizContainer.vue';
import Multiselect from 'vue-multiselect';
import preScannedTexts from '@/scanned';
import config from '@/config';
import JsonExcel from 'vue-json-excel3';
import api from '@/api';

export default {
  name: 'ScannerVisualizations',
  components: {
    TipiMessage,
    TipiCsvDownload,
    ScannerWordsCloud,
    ScannerSunburst,
    ScannerBarchart,
    ScannerTable,
    ScannerLegend,
    ScannerListVizContainer,
    Multiselect,
    JsonExcel,
  },
  props: {
    result: {
      type: Object || null,
      required: true,
    },
  },
  data() {
    return {
      preScannedTexts: preScannedTexts,
      resultToCompare: null,
      textToCompare: null,
      csvItems: this.result.tags,
      scanned: {},
      tagsInWordCloud: 25,
      styles: config.STYLES,
      isLoadingDocuments: false,
      documents: [],
      compareOptions: [],
    };
  },
  methods: {
    searchDocuments(query) {
      if (query.length <= 1) {
        return;
      }

      this.isLoadingDocuments = true;
      api.searchScanned(query).then((response) => {
        this.documents = response ? response : [];
        this.compareOptions = [];
        this.documents.forEach((document) => {
          this.compareOptions.push(document.title);
        });
        this.isLoadingDocuments = false;
      });
    },
  },
  watch: {
    textToCompare(val) {
      const compareWith = this.documents.filter((d) => d.title === val);
      this.resultToCompare = compareWith.length ? compareWith[0] : null;
    },
  },
};
</script>

<style lang="scss">
.c-select-label {
  .multiselect {
    .multiselect__option--highlight {
      background-color: white;
      &:hover {
        background-color: #2d4252;
        color: white;
      }

      &.multiselect__option--selected {
        color: white;
      }
    }
  }
}
</style>
