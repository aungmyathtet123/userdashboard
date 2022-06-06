<template>
  <div>
  <div data-vuetify>
    <v-app id="app">

 <router-view></router-view>
     </v-app>
  </div>
  </div>
</template>

<script>
export default {
  name:'App',
}
</script>
<style scoped lang="scss">
  section {
  margin: 10px 0;
}
[data-vuetify] {
  overflow-y: hidden;
}
 div.v-application--wrap {
  min-height: 1vh !important;
}
</style>