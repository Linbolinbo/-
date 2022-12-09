<template>
  <div>
    <input type="text" v-model.trim="inputtext">
    <div>{{inputtext}}</div>
    <!-- <textarea name="" v-model="inputtext" id="" cols="30" rows="10"></textarea> -->
    <div>{{changeStr}}</div>
    <div>{{changeStr}}</div>
    <div>{{changeStr}}</div>
    <div>{{changeStr}}</div>

  </div>
</template>

<script>
  export default {

    data() {
      return {
        inputtext:'',
        msg:'linbo',
        
      }
    },  
    computed:{
      changeStr(){
        console.log(111);
        return this.msg.split("").reverse().join("")
      }
    }
  }
</script>

<style scoped>

</style>
