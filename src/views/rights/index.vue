<template>
  <div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
        async getRightList(){
          const {data:res} = await this.$http.get('rights/:type'); 
           if ( res.meta.status !==200){
            return this.$message.error('获取信息失败！');
        }
        console.log("right",res);
        } 
        
        
  }
}
</script>

<style lang='less'>

</style>
