<template>
  <div>
    <el-alert show-icon title="注意：只允许为第三个分类设置相关参数！" type="warning" :closable="false"></el-alert>
    <el-card>
      <el-row class="cat-opt">
        <el-col>
          <span>选择商品分类：</span>

          <el-cascader expand-trigger="hover"></el-cascader>
        </el-col>
      </el-row>

      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane label="动态参数" name="many"></el-tab-pane>
        <el-tab-pane label="静态属性" name="only"></el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "many"
    };
  },
  methods: {
    async getCateList(){
      const { data:res } = await this.$message.get('categories')
      if(res.meta.status !==200){
        return this.$message.error('获取商品分类失败！')
      }
      this.cateList = res.data
      console.log(this.cateList)
    },
    handleTabClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang='less'>
</style>
\