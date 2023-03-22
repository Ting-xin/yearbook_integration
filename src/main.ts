import { createApp } from 'vue';
import App from './App.vue';
import MapVue from './packages'
import "mapbox-gl/dist/mapbox-gl.css";
import router  from "./router";
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import AreaSelector from "@luohc92/vue3-area-selector";


import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App);
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(MapVue).use(router)
app.use(AreaSelector);

app.use(ElementPlus)

app.mount('#app')
