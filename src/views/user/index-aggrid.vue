<template>
  <div class="m-window">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" type="primary" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <div class="m-agTable">
        <ag-grid-vue
          style="height: 500px;margin-top: 20px;"
          class="ag-theme-alpine"
          :gridOptions="gridOptions"
          :columnDefs="columnDefs"
          :rowData="rowData"
        ></ag-grid-vue>
      </div>
      <div class="m-page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,2,5,10]"
          :page-size="queryInfo.pagesize"
          layout="total,sizes,prev, pager,next,jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加用户的模态框 -->
    <el-dialog
      v-dialogDrag
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import gridOptions from "@/public/gridOptions";
import { AgGridVue } from "ag-grid-vue";
import { createBtn } from "@/public/tableBtn";
import Vue from "vue";

/**方法一
 * 创建自定义 Vue 组件
 */
const deleleButton = Vue.extend({
  template: `<span >
        <el-button type="text" @click="delDetails" size="mini">删除</el-button>
    </span>`,

  methods: {
    delDetails() {
      this.params.context.componentParent.deleteDetails(this.params.node.data);
    },
  },
});

export default {
  name: "users",
  components: { AgGridVue },
  data() {
    //验证邮箱的规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return cb();
      }
      cd(new Error("请输入合法的邮箱"));
    };
    //验证手机号码的规则
    var checkMobile = (rule, value, cb) => {
      const regEmail = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regEmail.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法的手机号码"));
    };
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 10,
      },
      columnDefs: null,
      rowData: null,
      total: 0,
      addDialogVisible:false,
      //添加用户的表单数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名控制3~10个字符之间",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "用户名控制6~15个字符之间",
            trigger: "blur"
          }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
    };
  },
  beforeMount() {
    this.gridOptions = Object.assign({}, gridOptions({}), {
      onRowDoubleClicked: this.doubleClickSelected,
      context: {
        componentParent: this,
      },
    });
    this.columnDefs = [
      {
        headerName: "序号",
        field: "index",
        width: 100,
        cellRenderer: (params) => {
          return ++params.rowIndex;
        },
      },
      { headerName: "id", field: "id", width: 70, tooltipField: "id" },
      {
        headerName: "姓名",
        field: "username",
        width: 150,
        tooltipField: "username",
      },
      {
        headerName: "电话",
        field: "mobile",
        width: 150,
        tooltipField: "mobile",
      },
      { headerName: "邮箱", field: "email", width: 150, tooltipField: "email" },
      {
        headerName: "角色",
        field: "role_name",
        width: 150,
        tooltipField: "role_name",
      },
      {
        headerName: "状态",
        field: "mg_state",
        width: 100,
        tooltipField: "mg_state",
      },
      // {headerName: '操作', field: 'operation',width:150,tooltipField:'operation'},
      {
        headerName: "操作",
        field: "option",
        width: 400,
        cellRendererFramework: createBtn({
          btnArr: [
            { name: "查看" },
            { name: "复制" },
            { name: "编辑" },
            { name: "删除" },
          ],
          btnMethod: "onCellClicked",
          type: "planList",
        }),
      },
      // {
      //   headerName: "操作",
      //   width: 130,
      //   cellRendererFramework: deleleButton
      // }
    ];
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户列表失败！");
      }
      this.userlist = res.data.users;
      this.total = res.data.total;
      this.rowData = res.data.users;
      console.log(res);
    },
    /**方法一
     * @vuese
     * 表格内 Vue 组件回调
     */
    deleteDetails() {
      this.$confirm("确定删除此数据？");
    },
    //监听pagesize改变的事件
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getUserList();
    },
    //监听页码值变化
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getUserList();
    },
    //监听添加用户模态框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    /**方法二
     * @vuese
     * 列表操作行数据
     */
    onCellClicked(params, code) {
      this.selectedRow = params;
      switch (code) {
        // 查看
        case 0:
          this.pageState = 1;
          this.isPrint = false;
          this.$store.dispatch("planOrder/setPlanIsDraft", false);
          this.$store.dispatch("planOrder/setPlanBillId", "");
          break;
        // 复制
        case 1:
          // this.pageState = 2;
          this.$store.dispatch("planOrder/setPlanIsDraft", false);
          this.$store.dispatch("planOrder/setPlanBillId", params.id);
          // this.$refs.newPlanOrder.init();
          params.optionType = "copy";

          this.addTab({
            name: "新增计划订单",
            code: "newPlanOrder",
            data: params,
          });
          break;
        // 编辑
        case 2:
          // this.pageState = 2;
          this.$store.dispatch("planOrder/setPlanIsDraft", true);
          this.$store.dispatch("planOrder/setPlanBillId", params.id);

          this.addTab({
            name: "编辑计划订单",
            code: "newPlanOrder",
            data: params,
          });
          break;
        // 删除
        case 3:
          this.deleteOrder(params);
          break;
      }
    },
    //点击按钮，确定添加新用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加用户失败！");
        }
        // console.log("users",res)
        this.$message.success("添加用户成功");
        //隐藏添加用户模态框
        this.addDialogVisible = false;
        //重新获取用户列表数据
        this.getUserList();
      });
    },
    /**
     * @vuese
     * 删除订单
     */
    deleteOrder(params) {
      this.$confirm("请确认是否删除该管理员？", {
        customClass: "confirm",
      })
        .then((_) => {
          console.log("确认：", _);
          let data = {
            mostlyId: params.id,
            mxIdList: "",
          };
          // 加密数据
          let entryDate = {
            a: data,
          };
          this.$http
            .deletePlanBill(entryDate)
            .then((res) => {
              if (res.data && res.data.code == 200) {
                this.messageTip("success", "删除成功！");
                this.getDataList();
              } else {
                this.messageDialog(res.data.info);
              }
            })
            .catch((err) => {
              if (err.response) {
                this.messageDialog(err.response.data.info);
              }
            });
        })
        .catch((_) => {
          console.log("取消：", _);
        });
    },
  },
};
</script>

<style lang='less'>
</style>
