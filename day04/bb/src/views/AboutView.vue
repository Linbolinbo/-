<template>
  <div>
    <button @click="add">+</button>
    <div>{{count}}</div>
    <button @click="count--" :disabled="(count<=0)">-</button>
    <div>
      <button @click="click2(1,2)">按钮2</button>
      <button @click="click3($event)">按钮3</button>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count:0,
      }
    },
    methods:{
      add(){
        this.count+=1
      },
      click2(a,b){
        console.log(a,b);
      },
      click3(e){
        console.log(e);
      }
    }
  }
</script>

<style scoped>

</style>