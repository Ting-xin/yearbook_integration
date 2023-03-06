<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { GeoJSONSourceRaw } from "mapbox-gl";
import { onMounted, reactive, ref } from "vue";
import geojsonUrl from '../static/geojson/鼓楼区.json?url';
import { AreaSelector } from "@luohc92/vue3-area-selector";
import type { AreaDataDto, AreaSelectorPropsDto, AreaSelectorResultDto, Resolve, } from "@luohc92/vue3-area-selector";
import "@luohc92/vue3-area-selector/dist/style.css";
import Switches from 'vue-switches';

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
  district: "东城区",
  code: "110101001",
  city: "市辖区",
  province: "北京市",
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
      zoom: 9 // starting zoom
    })
  });

  state.map?.on('load', async () => {
    const response = await fetch(geojsonUrl);
    const data = await response.json();

    if (state.map && !state.geojson) {
      state.map.addSource("my-data", {
        type: "geojson",
        data,
      });

      state.map.addLayer({
        id: "my-layer",
        source: "my-data",
        type: "fill",
        paint: {
          "fill-color": "#00f",
          "fill-opacity": 0.5,
        },
      });

      state.geojson = state.map.getSource("my-data") as GeoJSONSourceRaw;
    }
  })
})
</script>

<template>
  <main>
    <div class="top">
      <div class="label">
        <div>时间:</div>
        <div>
          time
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
  min-height: 600px;
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
