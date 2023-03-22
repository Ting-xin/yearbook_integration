<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { GeoJSONSourceRaw } from "mapbox-gl";
import { onMounted, reactive, ref } from "vue";
import geojsonUrl from '../static/geojson/南京市人口插值.json?url';
import { AreaSelector } from "@luohc92/vue3-area-selector";
import type { AreaDataDto, AreaSelectorPropsDto, AreaSelectorResultDto, Resolve, } from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
import Switches from 'vue-switches';
import * as h3 from 'h3-js';
import * as turf from "@turf/turf";
import * as jenks from "turf-jenks";
import * as geojson2h3 from "geojson2h3";

const isGrid = ref<boolean>(true)

const areaSelectProps = reactive<AreaSelectorPropsDto>({
  popperClass: "my-area-popup",
  townLazy: true,
  level: 0,
  showAllLevels: true,
  disabled: [],
  lazyLoad: (node: AreaDataDto, resolve: Resolve) => {
    return setTimeout(() => {
      if (node.code === "110101") {
        const data: AreaDataDto[] = [{ code: "110101001", name: "东华门街道" }];
        resolve(data);
      } else if (node.code === "110102") {
        const data: AreaDataDto[] = [{ code: "110101002", name: "西华门街道" }];
        resolve(data);
      } else {
        resolve();
      }
    }, 2000);
  },
});
const area = ref<AreaSelectorResultDto>({
  district: '',
  code: "3201",
  city: "南京市",
  province: "江苏省",
});

const change = (data: AreaSelectorResultDto) => {
  console.log(data);
};
const open = () => {
  console.log("open");
};
const close = (data: AreaSelectorResultDto) => {
  console.log("close", data);
};

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  geojson?: GeoJSONSourceRaw;
  map?: mapboxgl.Map | undefined;
}

onMounted(() => {
  const state = reactive<IState>({
    map: new mapboxgl.Map({
      accessToken: accessToken,
      container: 'grid_container',
      style: 'mapbox://styles/mapbox/light-v11', // style URL
      center: [118.78, 32], // starting position
      zoom: 8 // starting zoom
    })
  });

  state.map?.on('load', async () => {
    const response = await fetch(geojsonUrl);
    const data = await response.json();

    console.log('data: ', data)
    console.log('jenks: ', jenks(data, 'pop', 5))



    if (state.map && !state.geojson) {
      state.map.addSource("temp_data", {
        type: "geojson",
        data: data
      });

      state.map.addLayer({
        id: "my-layer",
        source: "temp_data",
        type: "fill",

        // paint: {
        //   // 根据面数据的属性值来设置热力图强度
        //   'heatmap-weight': ['get', 'pop'],
        //   // 调整权重映射
        //   'heatmap-intensity': 1,
        //   // 调整热力图半径
        //   'heatmap-radius': 50,
        //   // 调整热力图透明度
        //   'heatmap-opacity': 0.9,
        //   // 设置热力图的颜色
        //   'heatmap-color': [
        //     'interpolate',
        //     ['linear'],
        //     ['heatmap-density'],
        //     0.0015928455896551726, 'rgba(33,102,172,0)',
        //     0.7562301826896553, 'rgb(103,169,207)',
        //     2.0771873278448276, 'rgb(209,229,240)',
        //     4.410473700324139, 'rgb(253,219,199)',
        //     8.115882904358621, 'rgb(239,138,98)',
        //     12.625668643544829, 'rgb(178,24,43)'
        //   ]
        // }

        paint: {
          'fill-color': {
            type: 'exponential',
            property: 'pop',
            stops: [
              [0.0015928455896551726, '#bdd7e7'],
              [0.7562301826896553, '#92c5de'],
              [2.0771873278448276, '#0571b0'],
              [4.410473700324139, '#f4a582'],
              [8.115882904358621, '#ca0020'],
              [12.625668643544829, '#f00'],
            ],
          },
          'fill-opacity': 0.7,
        }
        });

      state.geojson = state.map.getSource("temp_data") as GeoJSONSourceRaw;
    }
  })
})
</script>

<template>
  <main>
    <div class="top">
      <div class="label">
        <div>时间(年):</div>
        <div>
          <input id="time_input" />
        </div>
      </div>
      <div class="label">
        <div>地点:</div>
        <div>
          <AreaSelector @change="change" @open="open" @close="close" :props="areaSelectProps" v-model="area">
          </AreaSelector>
        </div>
      </div>
      <div>
        <div>地理网格</div>
        <switches v-model="isGrid"></switches>
        <div>行政区划</div>
      </div>

    </div>
    <div class="buttom">
      <div id="grid_container"></div>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100%;
  height: 100%;
}

main .top {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 60px;
  font-family: 'Roboto Mono', 'Noto Sans SC';
  font-size: 18px;
  font-weight: bold;
}

main .top div {
  display: flex;
  align-items: center;
  gap: 10px;
}

main .top .label {
  gap: 20px;
}

#grid_container {
  min-height: 700px;
  height: 100%;
  width: 100%;
  position: relative;
}

#time_input {
  outline-style: none;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 6px;
  width: 80px;
  font-size: 14px;
  font-family: "Microsoft soft";
}

#time_input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6)
}
</style>
