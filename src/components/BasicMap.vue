<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { Style, GeoJSONSourceRaw } from "mapbox-gl";
import { onMounted, reactive } from "vue";
import geojsonUrl from '../static/geojson/鼓楼区.json?url';

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

interface IState {
  geojson?: GeoJSONSourceRaw;
  map?: mapboxgl.Map | undefined;
}

onMounted(() => {
  const state = reactive<IState>({
    map: new mapboxgl.Map({
      accessToken: accessToken,
      container: 'map_container',
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
  <div id="map_container"></div>
</template>

<style scoped>
#map_container {
  min-height: 600px;
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
