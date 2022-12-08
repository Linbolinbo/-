<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item.id">{{item.id}}--{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list:[
          {name:'linbo',id:1},
          {name:'zs',id:2},
          {name:'ls',id:3}


        ]
      }
    },
    methods:{
      
    }
  }
</script>

<style scoped>

</style>