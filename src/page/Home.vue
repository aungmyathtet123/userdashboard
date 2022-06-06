<template>
  <div>
    <v-app>
      <v-card width="100%" class="mx-auto overflow-hidden">
       <Nav/>
        <div class="text-h4 font-weight-light mb-5 mt-5 text-center p-5">
        {{ $t('User Register Dashboard')}}
        </div>
        <br />
        <v-sheet
          class="v-sheet--offset mx-auto mt-5"
          color="cyan"
          elevation="12"
          max-width="calc(90% - 32px)"
        >
          <v-sparkline
            :labels="labels"
            :value="value"
            color="white"
            line-width="2"
            padding="16"
          ></v-sparkline>
        </v-sheet>
      </v-card>
    </v-app>
  </div>
</template>
<script>
import Nav from "./Nav";
export default {
  components: {
    Nav,
  },
  name: "Home",
  data: () => ({
    
    group: null,
   
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240],
    token: "",
  }),
  created() {
        let token = localStorage.getItem("token");
        this.token = token;
        console.log(token);
     
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
      // console.log(token);
    },
  },
};
</script>
<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
.user {
  text-decoration: none;
  color: rgb(26, 24, 24) !important;
}
</style>
