<template>
  <div id="app">
    <Navigation />
    <div id="content" class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./components/layout/Navigation.vue";
export default {
  name: "app",
  components: {
    Navigation,
  },
};
</script>

<style>
@font-face {
  font-family: "GowunDodum-Regular";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunDodum-Regular.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

* {
  font-family: "GowunDodum-Regular";
}

html body {
  background-color: #718093;
}
</style>
