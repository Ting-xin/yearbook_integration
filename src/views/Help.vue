<script setup lang="ts">
import mapboxgl from "mapbox-gl";

import {onMounted, ref} from "vue";

onMounted(()=>{
  console.log("wangaaaaa")

  mapboxgl.accessToken = 'pk.eyJ1IjoiY2FydG9kYmluYyIsImEiOiJja202bHN2OXMwcGYzMnFrbmNkMzVwMG5rIn0.Zb3J4JTdJS-oYNXlR3nvnQ';
  map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [119, 32], // starting position [lng, lat]
    zoom: 9 // starting zoom
  });
  map.on('load', () => {
    initLoadAllLayer()
  })
})

var map=ref(null)

let layersTableData=ref([
  {
    id: '1',
    name:"鼓楼区",
    jsonUrl:"src/static/geojson/鼓楼区.json",
    json:"",
    dataType:"fill",
    show:true
  },
  {
    id: '2',
    name:"南京市",
    jsonUrl:"src/static/geojson/南京市.json",
    json:"",
    dataType:"line",
    show:true
  },
  {
    id: '3',
    name:"南京市人口",
    jsonUrl:"src/static/geojson/南京市人口.json",
    json:"",
    dataType:"fill",
    show:true
  }
])

const value = ref(true)

async function initLoadAllLayer(){
  for (let i = 0; i < layersTableData.value.length; i++) {
    let layerInfo=layersTableData.value[i]

    const response = await fetch(layerInfo.jsonUrl);
    layersTableData.value[i].json=await response.json()
    console.log(layersTableData.value[i].json)

    map.addSource(layerInfo.id, {
      type: "geojson",
      data:layersTableData.value[i].json
    });

    if(layerInfo.dataType=="fill"){
      map.addLayer({
        id:layerInfo.id,
        source:layerInfo.id,
        type:"fill",
        paint:{
          "fill-color":"#" + Math.random().toString(16).substr(2, 6),
          "fill-opacity":0.5
        }
      });
    }else if(layerInfo.dataType=="line"){
      map.addLayer({
        id:layerInfo.id,
        source:layerInfo.id,
        type:"line",
        paint:{
          "line-color":"#" + Math.random().toString(16).substr(2, 6),
          "line-opacity":1,
          "line-width":2
        }
      });
    }else{
      map.addLayer({
        id:layerInfo.id,
        source:layerInfo.id,
        type:"circle",
        paint:{
          "circle-color":"#" + Math.random().toString(16).substr(2, 6),
          "circle-opacity":0.5
        }
      });
    }

  }
}


function handleLayerShowChange(row) {
  console.log(row)
  if (row.show) {
    this.handleLayoutChange(row.id, "visibility", "visible");
  } else {
    this.handleLayoutChange(row.id, "visibility", "none");
  }
}
//
// function handleAddSource(newSource) {
//   console.log("add new source：", newSource);
//   map.addSource(newSource.sourceName, {
//     type: newSource.sourceType,
//     url: newSource.sourceUrl
//   });
// }

// function handleAddLayer(newLayer) {
//   console.log("add new layer：", newLayer);
//   map.addLayer(newLayer);
// }

function handleRemoveSource(sourceName) {
  map.removeSource(sourceName);
}

function handleRemoveLayer(layerName) {
  map.removeLayer(layerName);
}

function handleLayoutChange(layerName, key, value) {
  console.log("layout:", layerName, key, value);
  map.setLayoutProperty(layerName, key, value);
}

function handlePaintChange(layerName, key, value) {
  console.log("paint:", layerName, key, value);
  map.setPaintProperty(layerName, key, value);
}

</script>

<template>
  <div style="display: flex; height: 800px;">
    <div style="width: 400px">
      <h3 style="text-align: center">图层树</h3>
      <el-table :data="layersTableData" style="width: 100%" height="100%">
        <el-table-column prop="name" label="名称"  >
        </el-table-column>
        <el-table-column  label="操作">
          <template #default="scope">
            <el-switch v-model="scope.row.show" @change="handleLayerShowChange(scope.row)"/>
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div id="map" style="width: 100%"></div>
  </div>
</template>
