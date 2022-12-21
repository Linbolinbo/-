<template>
    <div>
        <input type="" name="" value="" v-model="input">
        <button type="" @click="getYI">点击</button>
        <div>
            {{mass}}
        </div>
    </div>
</template>

<script>
import {get} from '@/http/axios'
    export default {
        data() {
            return {
                input:'',
                mass:''
            }
        },
        methods: {
            async getYI(){
                let params={
                    type:this.input
                }
                let res=await get('/api/epidemic?api_key=30a14043caad3771',params)
                console.log(res);
            }
        },
    }
</script>

<style scoped>

</style>