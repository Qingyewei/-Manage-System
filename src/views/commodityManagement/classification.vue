<template>
  <div class="m-categories m-window">
   <div>
     <el-row>
       <el-col>
         <el-button type="primary" @click="showAddDialog">添加分类</el-button>
       </el-col>
     </el-row>

     <tree-table class="treetable"
     :data="catelist"
     :columns="columns"
     :selection-type="false"
     :expand-type="false"
     show-index
     index-text="#"
     border
     :show-row-hover="false"
     >

     <!-- 是否有效 -->
     <template slot="isok" slot-scope="scope">
       <i class="el-icon-success" v-if="scope.row.cat_deleted === false"
       style="color:lightgreen"></i>
     </template>

     <!-- 排序 -->
     <template slot="order" slot-scope="scope">
       <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
       <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
       <el-tag type="warning" size="mini" v-else>三级</el-tag>
     </template>

     <!-- 操作 -->
     <template slot="opt">
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>

     </tree-table>

     <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="querInfo.pagenum" :page-sizes="[3, 5, 10, 15]" :page-size="querInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
   </div>


   <!-- 添加分类的模态框 -->
   <el-dialog
   v-dialogDrag
     title="添加分类"
     :visible.sync="addCateDialogVisible"
     width="50%"
     :close="addCateDialogClosed">
    <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类：">
         <!-- options 用来指定数据源 -->
          <!-- props 用来指定配置对象 -->
          <el-cascader 
          props.expandTrigger="hover" 
          :options="parentCateList" 
          :props="cascaderProps" 
          
          v-model="selectedKeys" 
          @change="parentCateChanged" 
          clearable props.checkStrictly>
          </el-cascader>
      </el-form-item>
    </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="addCateDialogVisible = false">取 消</el-button>
       <el-button type="primary" @click="addCate">确 定</el-button>
     </div>
   </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    addTab: {
      type: Function
    },
    removeTab: {
      type: Function
    }
  },
  data () {
    return {
      querInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      catelist:[],
      total:0,
      columns:[
        {
          label:'分类名称',
          prop:'cat_name'
        },
        {
          label: '是否有效',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'isok'
        },
        {
          label: '排序',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'order'
        },
        {
          label: '操作',
          // 表示，将当前列定义为模板列
          type: 'template',
          // 表示当前这一列使用模板名称
          template: 'opt'
        },
      ],
      addCateDialogVisible:false,
      addCateForm:{
        cat_name:'',
        cat_pid:0,
        cat_level:0
      },
      addCateFormRules:{
        cat_name:[{required:true,message:'请输入分类名称',trigger:'blur'}]
      },
      parentCateList:[],
      //指定级联选择器的配置对象
      cascaderProps:{
        value:'cat_id',
        label:'cat_name',
        children:'children'
      },
      // 选中的父级分类的Id数组
      selectedKeys: []
    }
  },
  created(){
    this.getCateList()
  },
  methods: {
    //获取商品分类数据
    async getCateList(){
      const { data:res } = await this.$http.get('categories',{
        params:this.querInfo
      })
      if(res.meta.status !==200){
        return this.$message.error('获取商品分类失败！')
      }

      console.log(res.data)
      // 把数据列表，赋值给 catelist
      this.catelist = res.data.result
      // 为总数据条数赋值
      this.total = res.data.total
    },
    // 监听 pagesize 改变
    handleSizeChange(newSize) {
      this.querInfo.pagesize = newSize
      this.getCateList()
    },
    // 监听 pagenum 改变
    handleCurrentChange(newPage) {
      this.querInfo.pagenum = newPage
      this.getCateList()
    },
    showAddDialog(){
      this.addCateDialogVisible = true
      this.getParentCateList()
    },
    async getParentCateList(){
      const {data:res} = await this.$http.get('categories',{
        params:{type:2}
      })

      if(res.meta.status !==200){
        return this.$message.error('获取父级分类数据失败！')
      }

      console.log(res.data)
      this.parentCateList = res.data
    },
    parentCateChanged(){
      console.log(this.selectedKeys)
      // 如果 selectedKeys 数组中的 length 大于0，证明选中的父级分类
      // 反之，就说明没有选中任何父级分类
      if(this.selectedKeys.length > 0){
        this.addCateForm.cat_id = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length
      }else{
        this.addCateForm.cat_id = 0
        this.addCateForm.cat_level = 0
      }
    },
    addCate(){
      this.$refs.addCateFormRef.validate(async valid =>{
        if(!valid) return
        const {data:res } =await this.$http.post('categories',this.addCateForm)

        if(res.meta.status !==201){
          return this.$message.error('添加分类失败！')
        }
        this.$message.success('添加分类成功！')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    },
    addCateDialogClosed(){
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_level = 0
      this.addCateForm.cat_pid = 0
    }
  }
}
</script>

<style lang='less'>

</style>
