<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button type="primary" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <ag-grid-vue
        style="height: 500px;margin-top: 20px;"
        class="ag-theme-alpine"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
      ></ag-grid-vue>
    </el-card>
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
    }
  }
});

export default {
  name: "users",
  components: { AgGridVue },
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      columnDefs: null,
      rowData: null
    };
  },
  beforeMount() {
    this.gridOptions = Object.assign({}, gridOptions({}), {
      onRowDoubleClicked: this.doubleClickSelected,
      context: {
        componentParent: this
      }
    });
    this.columnDefs = [
      {
        headerName: "序号",
        field: "index",
        width: 100,
        cellRenderer: params => {
          return ++params.rowIndex;
        }
      },
      { headerName: "id", field: "id", width: 70, tooltipField: "id" },
      {
        headerName: "姓名",
        field: "username",
        width: 150,
        tooltipField: "username"
      },
      {
        headerName: "电话",
        field: "mobile",
        width: 150,
        tooltipField: "mobile"
      },
      { headerName: "邮箱", field: "email", width: 150, tooltipField: "email" },
      {
        headerName: "角色",
        field: "role_name",
        width: 150,
        tooltipField: "role_name"
      },
      {
        headerName: "状态",
        field: "mg_state",
        width: 100,
        tooltipField: "mg_state"
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
            { name: "删除" }
          ],
          btnMethod: "onCellClicked",
          type: "planList"
        })
      }
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
        params: this.queryInfo
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
            data: params
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
            data: params
          });
          break;
        // 删除
        case 3:
          this.deleteOrder(params);
          break;
      }
    },
    /**
     * @vuese
     * 删除订单
     */
    deleteOrder(params) {
      this.$confirm("请确认是否删除该管理员？", {
        customClass: "confirm"
      })
        .then(_ => {
          console.log("确认：", _);
          let data = {
            mostlyId: params.id,
            mxIdList: ""
          };
          // 加密数据
          let entryDate = {
            a: data
          };
          this.$http
            .deletePlanBill(entryDate)
            .then(res => {
              if (res.data && res.data.code == 200) {
                this.messageTip("success", "删除成功！");
                this.getDataList();
              } else {
                this.messageDialog(res.data.info);
              }
            })
            .catch(err => {
              if (err.response) {
                this.messageDialog(err.response.data.info);
              }
            });
        })
        .catch(_ => {
          console.log("取消：", _);
        });
    }
  }
};
</script>

<style lang='less'>
</style>
