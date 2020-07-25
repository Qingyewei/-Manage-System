<template>
  <div class="m-orders m-window">
    <div>
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="m-table">
        <el-table :data="orderlist" border stripe>
          <el-table-column type="index"></el-table-column>
          <el-table-column header-align="center" align="center" prop="order_number" label="订单编号"></el-table-column>
          <el-table-column header-align="center" align="center" prop="order_price" label="订单价格"></el-table-column>
          <el-table-column prop="pay_status" label="是否下单">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
              <el-tag type="danger" v-else>已付款</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货">
            <template slot-scope="scope">{{scope.row.is_send}}</template>
          </el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template slot-scope="scope">{{scope.row.create_time | dateFormat}}</template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="showBox"></el-button>
              <el-button
                size="mini"
                type="success"
                icon="el-icon-location"
                @click="showProgressBox"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="m-pagination">
        <!-- 分页区域 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[5, 10, 15]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 修改地址的模态框 -->
    <el-dialog
      v-dialogDrag
      title="修改地址"
      :visible.sync="addressVisible"
      width="50%"
      :close="addressDialogClosed"
    >
      <el-form
        :model="addressForm"
        :rules="addressFormRules"
        ref="addressFormRef"
        label-width="100px"
      >
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addressVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog v-dialogDrag title="物流进度" :visible.sync="progressVisible" width="50%">
      <el-timeline>
        <el-timeline-item
          v-for="(activity, index) in progressInfo"
          :key="index"
          :timestamp="activity.time"
        >{{activity.context}}</el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import cityData from "./citydata.js";
export default {
  props: {
    addTab: {
      type: Function,
    },
    removeTab: {
      type: Function,
    },
  },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderlist: [],
      addressVisible: false,
      addressForm: {
        address1: [],
        address2: "",
      },
      addressFormRules: {
        address1: [
          { required: true, message: "请输入省市区县", trigger: "blur" },
        ],
        address2: [
          { required: true, message: "请填写详细地址", trigger: "blur" },
        ],
      },
      cityData,
      progressVisible: false,
      progressInfo: [],
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get("orders", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取订单列表失败！");
      }
      console.log(res.data);
      this.total = res.data.total;
      this.orderlist = res.data.goods;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getOrderList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getOrderList();
    },
    showBox() {
      this.addressVisible = true;
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields();
    },
    async showProgressBox() {
      const { data: res } = await this.$http.get("/kuaidi/804909574412544580");

      if (res.meta.status !== 200) {
        return this.$message.error("获取物流信息失败！");
      }
      this.progressInfo = res.data;
      this.progressVisible = true;
      console.log(this.progressInfo);
    },
  },
};
</script>

<style lang='less'>
</style>
