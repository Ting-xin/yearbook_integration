import { createApp } from 'vue';
import App from './App.vue';
import MapVue from './packages'
import "mapbox-gl/dist/mapbox-gl.css";
import router  from "./router";

const app = createApp(App);
app.use(MapVue).use(router).mount('#app')
