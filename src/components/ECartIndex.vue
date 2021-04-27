<template>
  <div id="ecart-index">
    <h2>FFFFFFf</h2>
    <button type="button" class="btn btn-primary" @click="oncha">ไก่จ้า</button>
    <span>{{ this.$store.getters.showFood}}</span>
      <span>{{datafood}}</span>
  </div>
</template>

<script scoped>


export default {
  name: "ecart-index",
  data() {
    return {
      food: "ไก่จ้า" ,
      datafood :"" 
    };
  } ,
  methods:{
    oncha(){
      this.$store.commit('setFood',this.food);
      this.datafood =this.$store.getters.showFood ;
      console.log(this.$store.getters.showdataCart);
    }
  }
};

</script>

<style></style>
