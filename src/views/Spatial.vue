<script setup lang="ts">
import type { S2DataConfig, S2Options } from '@antv/s2';
import { SheetComponent } from '@antv/s2-vue';
import { defineComponent, onMounted, reactive, ref, shallowRef } from 'vue';
import "@antv/s2-vue/dist/style.min.css";
import dataUrl from '../static/excel_data/temp_data.json?url';
import type { Statistcs } from "../common";

const s2DataConfig = reactive({
  fields: {
    rows: ['source', 'time', 'space', 'index'],
    // columns: ['type'],
    values: ['value', 'unit'],
  },
  data: {
    "value": "temp",
    "time": "temp",
    "space": "temp",
    "index": "temp",
    "unit": "temp",
    "source": "temp",
    "note": "temp"
  }
})

fetch(dataUrl)
  .then(resp => resp.json())
  .then(temp_data => s2DataConfig.data = temp_data);
// dataCfg 数据字段较多，建议使用 shallow, 如果有数据更改直接替换整个对象

const s2Options = {
  hierarchyType: 'tree',
  width: 1900,
  height: 800,
  // style: {
  //   colCfg: {
  //     width: (colNode) => {
  //       console.log('colNode: ', colNode);
  //       return colNode.colIndex <= 2 ? 100 : 50
  //     },
  //   },
  // },
}

const dataCfg = shallowRef(s2DataConfig);
const options: typeof S2Options = reactive(s2Options);
</script>

<template>
  <main>
    <SheetComponent :dataCfg="dataCfg" :options="options" />
  </main>
</template>

<style>
main {
  height: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
}

.ali-grid .ali-table {
  width: 100%;
  height: 100%;
}

/* 表格边框样式 */
.ali-grid .ali-table td,
.ali-grid .ali-table th {
  border: 1px solid #ccc;
}

/* 表头样式 */
.ali-grid .ali-table thead th {
  background-color: #eee;
}

/* 单元格背景色 */
.ali-grid .ali-table td {
  background-color: #fff;
}
</style>
