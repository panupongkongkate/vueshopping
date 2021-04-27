<template>
  <div id="app">
    <nav-index/>
    <router-view class="pb-5"/>
    <foot-index/>
  </div>
</template>

<script>
import NavbarIndex from "@/components/NavbarIndex";
import FootterIndex from "@/components/FootterIndex";
import {store} from './store/store'
export default {
  name: "App",
  store ,
  components: {
    "nav-index": NavbarIndex,
    "foot-index":FootterIndex
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sriracha&display=swap");

html {
  position: relative;
  min-height: 100%;
}

body {
  /* Margin bottom by footer height */
  margin-bottom: 60px;
}
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  white-space: nowrap;
  line-height: 60px; /* Vertically center the text there */
}

#app {
  font-family: "Sriracha", cursive;
  color: #2c3e50;
}
</style>
