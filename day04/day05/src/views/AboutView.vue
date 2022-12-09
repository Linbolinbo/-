<template>
  <div>
    
    <div>{{new Date() | fmtDate_global}}</div>
    <!-- <router-link to="/about/foot">footballnew</router-link> |
      <router-link to="/about/basket">basketballnew</router-link> -->
      <button @click="tofootball">足球新闻</button>
      <button @click="tobasketfall">篮球新闻</button>
      <router-view></router-view>
  </div>
</template>

<script>


  export default {
    data() {
      return {
        homeid:'fsdsd'
      }
    },
    methods:{
      tofootball(){
        this.$router.push({
          name:'foot',
          params:{
            homeid:this.homeid
          }
        })
      },
      tobasketfall(){
        this.$router.push({
          path:'/about/basket',
          query:{
            homeid:this.homeid
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
