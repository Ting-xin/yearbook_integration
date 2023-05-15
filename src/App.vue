<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed, ref } from "vue";

// 路由中添加key解决切换路由时页面不展示内容，刷新后才展示内容问题
const route = useRoute();
const key = computed(() => {
  return route.path + Math.random();
});

const sta = ref<boolean>(false)
const spa = ref<boolean>(false)
const spaSta = ref<boolean>(false)

const showUl = (name: string) => {
  switch (name) {
    case 'sta':
      sta.value = !sta.value
      break;
    case 'spa':
      spa.value = !spa.value
      break;
    case 'spaSta':
      spaSta.value = !spaSta.value
      break;
    default:
      break;
  }
}

</script>

<template>
  <div class="container">
    <div class="header">
      <div class="title"><a href="/">统计年鉴空间整合框架</a></div>
      <section>
        <ul class="subitem">
          <li><button class="bttn-minimal bttn-md bttn-primary"><router-link to="/division">行政区划</router-link></button>
          </li>
          <li><button class="bttn-minimal bttn-md bttn-primary"><router-link to="/grid">地理网格</router-link></button></li>
          <li><button class="bttn-minimal bttn-md bttn-primary" @click="showUl('sta')">统计数据集成</button>
            <ul v-if="sta">
              <li><button class="bttn-minimal bttn-md bttn-primary"><router-link
                    to="/statistics">统计数据</router-link></button></li>
              <li><button class="bttn-minimal bttn-md bttn-primary"><router-link
                    to="/staIntegre">统计数据集成</router-link></button></li>
          </ul>
        </li>
        <li><button class="bttn-minimal bttn-md bttn-primary" @click="showUl('spa')">空间数据集成</button>
          <ul v-if="spa">
            <li><button class="bttn-minimal bttn-md bttn-primary"><router-link to="/spatial">空间数据</router-link></button>
            </li>
            <li><button class="bttn-minimal bttn-md bttn-primary"><router-link
                  to="/spaIntegre">空间数据集成</router-link></button></li>
          </ul>
          </li>
          <li><button class="bttn-minimal bttn-md bttn-primary" @click="showUl('spaSta')">空间化统计数据</button>
            <ul v-if="spaSta">
              <li><button class="bttn-minimal bttn-md bttn-primary"><router-link
                    to="/spaSta">空间化统计数据选择</router-link></button></li>
              <li><button class="bttn-minimal bttn-md bttn-primary"><router-link
                    to="/spaSta_operation">空间化统计数据操作</router-link></button></li>
            </ul>
          </li>
          <li><button class="bttn-minimal bttn-md bttn-primary"><router-link to="/help">帮助</router-link></button></li>
        </ul>
      </section>

      <!-- <section>
                  <div class="subitem">
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/division">行政区划</router-link></button>
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/grid">地理网格</router-link></button>
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/staIntegre">统计数据集成</router-link></button>
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/spaIntegre">空间数据集成</router-link></button>
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/spaSta">空间化统计数据</router-link></button>
                    <button class="bttn-minimal bttn-md bttn-primary"><router-link to="/help">帮助</router-link></button>
                  </div>
                </section> -->
    </div>
    <div class="content">
      <router-view :key="key" />
    </div>
    <div class="footer">yearbook_integration @ timeroute 2023</div>
  </div>
</template>

<style scoped>
@import url(./public/minimal.css);

body {
  font-family: 'Roboto Mono', 'Noto Sans SC';
}

.container {
  background-color: #f6f6f6;
}

.header {
  height: 64px;
  line-height: 64px;
  padding: 0 24px;
  background-color: white;
  box-shadow: 0 0 16px #ccc;
  display: flex;
}

.header .title {
  padding: 0 24px;
  font-size: 1.4em;
  font-weight: bold;
}

.header section {
  padding: 0 24px;
  display: flex;
  flex-direction: column;
}

.header section .subitem {
  display: flex;
  gap: 16px;
  height: 100%;
}

.title a {
  text-decoration: none;
  font-weight: bold;
  color: grey;
}

.title a:hover {
  background: #f6f6f6;
}

.title a:active {
  color: grey;
}

.subitem {
  list-style: none;
  font-weight: bold;
}

.subitem button {
  color: #888;
  text-decoration: none;
  font-weight: bold;
}

.subitem li a {
  color: #888;
  text-decoration: none;
  font-weight: bold;
}

.subitem li ul {
  z-index: 10;
  width: 210;
  height: 160px;
  margin-left: -64px;
  display: block;
  position: absolute;
  list-style: none;
}

.content {
  /* padding: 20% 0; */
  margin: 10px 0;
  background-color: white;
  box-shadow: 0 0 16px #ccc;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.footer {
  background-color: white;
  padding: 12px 24px;
  font-size: 0.9em;
  color: #999;
  text-align: center;
}
</style>
