import Vue from 'vue';
/**
 * ag-grid表单元格多按钮组件
 * 返回的code值需要跟按钮数组中的按钮业务逻辑相对应
 * @arg {btnArr,btnMethod} object
 * btnArr   按钮数组
 * btnMethod    按钮回调方法名
 */
export const createBtn = (data) => {
    let {
        btnArr,
        btnMethod,
        type
    } = data;
    btnArr.forEach((item, index) => {
        item.index = index;
    })
    if (btnArr && btnMethod) {
        let optionBtn = Vue.extend({
            template: `<div>
                        <el-button  size="mini" class="optionBtn" :class="{'z-delete':item.name == '删除'}" @click="clickOption(item.index)" v-for="(item,index) in btnArr" :key="index">{{item.name}}</el-button>
                      </div>`,
            data() {
                return {
                    detail: {},
                    btnArr: []
                }
            },
            beforeMount() {
                this.detail = this.params.data;
                if (type == "planList") {
                    if (this.detail.isSend == '0') {
                        this.btnChange(["删除", "编辑","复制"]);
                    } else {
                        this.btnChange([]);
                    }
                // } else if (type == "monPlanList") {
                //     if (this.detail.auditingFlag == '20') {
                //         this.btnChange(["删除", "编辑"]);
                //     } else {
                //         this.btnChange(["复制"]);
                //     }
                // } else if (type == "cmaSampleApplyList") {
                //     if (this.detail.sendFlag == '已发送') {
                //         this.btnChange(["删除", "编辑"]);
                //     } else {
                //         this.btnChange(["复制"]);
                //     }
                // } else if (type == "inspectionReportList") {
                //     if (this.detail.isSend == '1') {
                //         this.btnChange(["删除", "编辑"]);
                //     } else {
                //         this.btnChange(["复制"]);
                //     }
                // } else if (type == "customize") {
                //     if (this.detail.isNormal == '订制') {
                //         if (this.detail.isSend == '0') {
                //             this.btnChange(["删除", "编辑", "复制延期订单", "复制计划订单", "我的担保书"]);
                //         } else {
                //             this.btnChange(["复制延期订单", "复制计划订单", "我的担保书"]);
                //         }
                //     } else {
                //         if (this.detail.isSend == '0') {
                //             this.btnChange(["删除", "编辑"]);
                //         } else {
                //             this.btnChange([]);
                //         }
                //     }
                // } else if (type == "returnProduct") {
                //     if (this.detail.isSend == '0') {
                //         this.btnChange(["删除", "编辑"]);
                //     } else {
                //         this.btnChange([]);
                //     }
                // }
                // // 礼品订单管理模块
                // else if (type == "giftOrderSearch" || type == "giftTakeMesSearch") {
                //     if (this.detail.planBill) {
                //         this.btnChange(["复制"])
                //     } else {
                //         this.btnChange([])
                //     }
                // } else if (type == "monPlanOrderSearch") {
                //     this.btnChange([])
                // } else {
                //     if (type == 1 && this.detail.orderType=="工程订单") {
                //         this.btnChange(["删除", "编辑", "复制"]);
                //     }else if (type == 1 && this.detail.orderType=="销售订单") {
                //       this.btnChange(["删除", "编辑"]);
                //     } else {
                //         this.btnChange(["复制"]);
                //     }
                }
            },
            methods: {
                clickOption(code) {
                    this.params.context.componentParent[btnMethod](this.detail, code);
                },
                btnChange(codeArr) {
                    btnArr.forEach(item => {
                        let isExit = codeArr.some(code => {
                          return code == item.name
                        });

                        if (!isExit) {
                            this.btnArr.push(item);
                        }
                    });
                }
            }
        })
        return optionBtn
    } else {
        let optionBtn = Vue.extend({
            template: `<div></div>`,
            data() {
                return {
                    detail: {}
                }
            },
            beforeMount() {
                this.detail = this.params.data;
            }
        })
        return optionBtn
    }
}