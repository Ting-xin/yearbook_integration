<template>
  <div class="container">
    <div class="header">
      <div class="title">yearbook_integration</div>
      <section>
        <div class="subitem">
          <router-link to="/division">General Division</router-link>
          <router-link to="/grid">General Grid</router-link>
          <router-link to="/staIntegre">Statistics Integration</router-link>
          <router-link to="/spaIntegre">Spatial Integration</router-link>
          <router-link to="/spaSta">Spatialized Statistics</router-link>
          <router-link to="/help">Help</router-link>
        </div>
      </section>
    </div>
    <div class="content">
      <router-view />
    </div>
    <div class="footer">yearbook_integration @ timeroute 2023</div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
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
  gap: 8px;
}

.header section .subitem {
  display: flex;
  gap: 16px;
}

.header section .subitem a {
  background: #eee;
  color: #888;
  text-decoration: none;
  padding: 0px 8px;
  font-size: 16px;
  font-weight: bold;
}

.header section .subitem a:hover {
  background: #f6f6f6;
}

.content {
  /* padding: 20% 0; */
  margin: 20px;
  background-color: white;
  box-shadow: 0 0 16px #ccc;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.footer {
  background-color: white;
  padding: 12px 24px;
  font-size: 0.9em;
  color: #999;
  text-align: center;
}
</style>
