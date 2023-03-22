<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import type { GeoJSONSourceRaw } from "mapbox-gl";
import { onMounted, ref, reactive } from "vue";
interface IState {
  geojson?: GeoJSONSourceRaw;
  map?: mapboxgl.Map | undefined;
}
const accessToken = import.meta.env.VITE_ACCESS_TOKEN;
const state = reactive<IState>({
});

onMounted(() => {
  state.map = new mapboxgl.Map({
    accessToken: accessToken,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11', // style URL
    center: [118.78, 32], // starting position
    zoom: 8 // starting zoom
  })

  state.map?.on('load', () => {
    initLoadAllLayer()
  })
})

var map = ref(null)

let layersTableData = ref([
  {
    id: '1',
    name: "公共设施",
    jsonUrl: "src/static/geojson/鼓楼区.json",
    json: "",
    dataType: "fill",
    show: true
  },
  {
    id: '2',
    name: "餐饮",
    jsonUrl: "src/static/geojson/南京市.json",
    json: "",
    dataType: "line",
    show: false
  },
  {
    id: '3',
    name: "风景名胜",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '4',
    name: "公司企业",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '5',
    name: "购物",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '6',
    name: "金融保险服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '7',
    name: "科技文化服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '8',
    name: "商务住宅",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '9',
    name: "生活服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '10',
    name: "体育休闲服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '11',
    name: "医疗保健服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
  {
    id: '12',
    name: "住宿服务",
    jsonUrl: "src/static/geojson/南京市人口.json",
    json: "",
    dataType: "fill",
    show: false
  },
])

const value = ref(true)

async function initLoadAllLayer() {
  for (let i = 0; i < layersTableData.value.length; i++) {
    let layerInfo = layersTableData.value[i]

    const response = await fetch(layerInfo.jsonUrl);
    layersTableData.value[i].json = await response.json()
    console.log(layersTableData.value[i].json)

    state.map?.addSource(layerInfo.id, {
      type: "geojson",
      data: layersTableData.value[i].json
    });

    if (layerInfo.dataType == "fill") {
      state.map?.addLayer({
        id: layerInfo.id,
        source: layerInfo.id,
        type: "fill",
        paint: {
          "fill-color": "#" + Math.random().toString(16).substr(2, 6),
          "fill-opacity": 0.5
        }
      });
    } else if (layerInfo.dataType == "line") {
      state.map?.addLayer({
        id: layerInfo.id,
        source: layerInfo.id,
        type: "line",
        paint: {
          "line-color": "#" + Math.random().toString(16).substr(2, 6),
          "line-opacity": 1,
          "line-width": 2
        }
      });
    } else {
      state.map?.addLayer({
        id: layerInfo.id,
        source: layerInfo.id,
        type: "circle",
        paint: {
          "circle-color": "#" + Math.random().toString(16).substr(2, 6),
          "circle-opacity": 0.5
        }
      });
    }

    if(!layerInfo.show) {
      handleLayoutChange(layerInfo.id, "visibility", "none");
    }
  }
}


function handleLayerShowChange(row: any) {
  console.log(row)
  if (row.show) {
    handleLayoutChange(row.id, "visibility", "visible");
  } else {
    handleLayoutChange(row.id, "visibility", "none");
  }
}
//
// function handleAddSource(newSource) {
//   console.log("add new source：", newSource);
//   state.map?.addSource(newSource.sourceName, {
//     type: newSource.sourceType,
//     url: newSource.sourceUrl
//   });
// }

// function handleAddLayer(newLayer) {
//   console.log("add new layer：", newLayer);
//   state.map?.addLayer(newLayer);
// }

function handleRemoveSource(sourceName: string) {
  state.map?.removeSource(sourceName);
}

function handleRemoveLayer(layerName: string) {
  state.map?.removeLayer(layerName);
}

function handleLayoutChange(layerName: string, key: string, value: string) {
  console.log("layout:", layerName, key, value);
  state.map?.setLayoutProperty(layerName, key, value);
}

function handlePaintChange(layerName: string, key: string, value: string) {
  console.log("paint:", layerName, key, value);
  state.map?.setPaintProperty(layerName, key, value);
}

</script>

<template>
  <div style="display: flex; height: 800px;">
    <div style="width: 400px">
      <h3 style="text-align: center">南京市POI-GeoCube</h3>
      <el-table :data="layersTableData" style="width: 100%" height="100%">
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-switch v-model="scope.row.show" @change="handleLayerShowChange(scope.row)" />
          </template>
        </el-table-column>
      </el-table>

    </div>
    <div id="map" style="width: 100%"></div>
  </div>
</template>
