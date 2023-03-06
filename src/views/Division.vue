<script setup lang="ts">
import { provide, reactive, ref } from 'vue';
import type { GlobalProps, Item, Link } from '../common';
import { timeOrDefault, scrollToItem, Action } from '../common';
import TreeItem from '../components/TreeItem.vue';
import BasicMap from "../components/BasicMap.vue";
import codesUrl from '../static/json/codes.json?url';

const codes = ref<Item[]>([{
  code: 233333,
  name: "加载中...",
  start: new Date().getFullYear(),
}]);

const guide: Item = {
  code: 0,
  name: "凡例",
  start: 1980,
  action: Action.Open,
  children: [
    {
      code: 1,
      name: "尖括号内数字为代码的启用年份",
      start: 1980,
    },
    {
      code: 2,
      name: "灰色行表示已弃用的代码",
      start: 1980,
      end: 1990,
    },
    {
      code: 3,
      name: "以箭头起始的行描述新旧代码间的对应关系",
      start: 1980,
      action: Action.Open,
      children: [
        {
          code: 4,
          name: "向右的直箭头表明代码的后继",
          start: 1980,
          successors: [{ code: 5, time: 1990 }]
        },
        {
          code: 5,
          name: "向左的直箭头表明代码的前身",
          start: 1990,
        },
      ]
    },
    {
      code: 6,
      name: "支持键盘操作（Tab、回车、退格）",
      start: 1980,
    },
  ]
};

const options = reactive({
  hideSuccessors: false,
  hidePredecessors: false,
});

const items = new Map<number, Item[]>();
const predecessors = new Map<number, Link[]>();

const props: GlobalProps = { options, items, predecessors };
provide('props', props);

insertItem(guide);

fetch(codesUrl)
  .then(resp => resp.json())
  .then((arr: Item[]) => {
    arr.forEach(item => insertItem(item));
    scrollToHash();
    codes.value = arr;
  });

function insertItem(item: Item, parent?: Item) {
  let arr = items.get(item.code);
  if (arr == undefined) {
    arr = [];
    items.set(item.code, arr);
  }
  arr.push(item);

  item.successors?.forEach(link => {
    let links = predecessors.get(link.code);
    if (links == undefined) {
      links = [];
      predecessors.set(link.code, links);
    }
    links.push({ time: timeOrDefault(link, item), code: item.code });
  });
  item.children?.forEach(child => insertItem(child, item));
  item.parent = parent;
}

window.onhashchange = scrollToHash;

function scrollToHash() {
  let item = locateHash();
  if (item != undefined) scrollToItem(item);
}

function locateHash(): Item | undefined {
  if (!location.hash.length) return;
  let id = location.hash.substring(1);
  let parts = id.split(':');
  if (parts.length == 2) {
    let code = parseInt(parts[0]);
    let time = parseInt(parts[1]);
    let item = props.items.get(code)?.find(item => time == item.start);
    if (item != undefined) return item;
    window.alert("该代码不存在！");
  }
}
</script>

<template>
  <main >
    <div class="left">
          <div class="title">行政区划代码库</div>
        <fieldset id="options">
          <legend>选项</legend>
          <label><input type="checkbox" v-model="options.hideSuccessors" />隐藏后继</label>
          <label><input type="checkbox" v-model="options.hidePredecessors" />隐藏前身</label>
        </fieldset>
      <ul id="guide" class="top">
          <TreeItem :item="guide" />
        </ul>
      <ul class="top">
        <TreeItem v-for="child in codes" :item="child" />
      </ul>
    </div>
    <div class="right">
      <div class="right_top">
        <BasicMap />
      </div>
      <div class="right_buttom">
        table list
      </div>
    </div>
  </main>
</template>

<style>
body {
  font-family: 'Roboto Mono', 'Noto Sans SC';
}

main{
  width: 100%;
  height: 100%;
  display: flex;
}

main .left {
  width: 25%;
  height: 800px;
  overflow: auto;
  align-items: center;
}

main .right {
  width: 75%;
  height: 800px;
}

.right .right_top{
  height: 80%;
}

/* .right .right_top .mapboxgl-map{
  position: relative;
} */

.right .right_buttom {
  height: 20%;
}

.left .title {
  display: inline-block;
  margin-left: 1ch;
  margin-right: .3ch;
  font-size: 24px;
}

a {
  color: inherit;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

ul {
  list-style-type: none;
  padding-left: 2ch;
}

#guide rt {
  display: none;
}

#options {
  width: fit-content;
}

#options label:not(:last-child) {
  margin-right: 1ch;
}


</style>
