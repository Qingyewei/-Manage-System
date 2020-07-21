<template>
  <el-container class="m-home">
    <el-header>
      <div class="m-hearImg">
        <!-- <img src="@assets/logo.png" alt /> -->
      </div>
      <el-button type="primary" @click="loginout">退出</el-button>
    </el-header>
    <el-container>
      <!-- <div class="m-left">
      <ul>
        <li
          v-for="(item,index) in menulist"
          :key="index"
          @click="goMenu(item)"
          :class="{'active':item.authName==titleName}"
        >
          <i :class="iconsObj[item.id]"></i>
          <span>{{item.authName}}</span>
        </li>
      </ul>
      </div>-->
      <el-aside :width="isCollapse ? '60px' :'240px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
            v-if="item.children"
          >
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span v-if="!isCollapse">{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                :index="'/'+subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="goMenu(subItem,item)"
                :class="{'active':item.authName==titleName}"
              >
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item :index="index + ''" v-else @click="goMenu(item)">
            <i :class="iconsObj[item.id]"></i>
            <span>{{item.authName}}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <div class="m-right">
        <!-- 重置标签页按钮 -->
      <div class="reset-btn">
        <el-button @click="resetTab">清空标签</el-button>
      </div>
        <el-tabs v-model="editableTabsValue" @tab-remove="removeTab" @tab-add="addTab" type="card">
          <el-tab-pane :label="titleName" name="1">
            <component
            :is="'mine'"
            :addTab="addTab"
            :removeTab="removeTab"
          ></component>
          </el-tab-pane>
          <el-tab-pane
            v-for="item in editableTabs"
            :label="item.title"
            :name="item.name"
            :key="item.name"
            closable
          >
          <!-- <router-view :addTab="addTab" :removeTab='removeTab' :is=item.content></router-view> -->
            <component
            :is="item.content"
            :addTab="addTab"
            :removeTab="removeTab"
          ></component>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-container>
  </el-container>
</template>

<script>
import components from "@/views/home/components";
export default {
  components: components,
  name: "home",
  data() {
    return {
      menulist: [],
      isCollapse: false,
      iconsObj: {
        "125": "iconfont icon-user",
        "103": "iconfont icon-tijikongjian",
        "101": "iconfont icon-shangpin",
        "102": "iconfont icon-danju",
        "145": "iconfont icon-baobiao"
      },
      activePath: "",
      editableTabsValue: "1",
      editableTabs: [],
      tabIndex: 1,
      titleName: "首页"
    };
  },
  created() {
    this.getMenuList();
    this.$router.push("/Home");
    this.activePath = window.sessionStorage.getItem("activePath");
    if (
      this.editableTabs.length == 0 &&
      this.$router.currentRoute.name != "mine"
    ) {
      this.$router.push({ name: "Home" });
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      console.log(tabs, activeName);
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      if (tabs.length <= 1) {
        this.editableTabsValue = "1";
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
        return;
      }
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    // 新建标签页
    addTab(data) {
      if (this.editableTabs.length > 0) {
        var flag = false;
        var item;
        for (var i = 0; i < this.editableTabs.length; i++) {
          if (data.authName == this.editableTabs[i].title) {
            flag = true;
            item = this.editableTabs[i];
            break;
          }
        }
        if (flag) {
          this.editableTabsValue = item.name;
        } else {
          let newTabName = ++this.tabIndex + "";
          this.editableTabs.push({
            title: data.authName,
            name: newTabName,
            content: data.path
          });
          this.editableTabsValue = newTabName;
        }
      } else {
        let newTabName = ++this.tabIndex + "";
        this.editableTabs.push({
          title: data.authName,
          name: newTabName,
          content: data.path
        });
        this.editableTabsValue = newTabName;
      }
    },
    // 左侧菜单切换
    goMenu(data) {
      this.editableTabsValue = "1";
      this.$router.push("/" + data.path);
      console.log("/" + data.path);
      // this.titleName = data.authName;
      this.addTab(data)
    },
    /**
     * @vuese
     * 重置清空标签页
     */
    resetTab() {
      this.$confirm("是否确定清空所有标签页？", "消息提示", {
        distinguishCancelAndClose: true,
        showClose: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "confirmAsk"
      })
        .then(() => {
          this.editableTabs = [];
          this.editableTabsValue = "1";
          this.activeIndex = "0";
          this.isOpeneds = [];
          this.$router.push({ name: "home" });
        })
        .catch(action => {
          console.log(action);
        });
    },
    loginout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.menulist = res.data;
      console.log(res);
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    /**
     * @vuese
     * 重置清空标签页
     */
    resetTab () {
      this.$confirm("是否确定清空所有标签页？", "消息提示", {
        distinguishCancelAndClose: true,
        showClose: false,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        customClass: "confirmAsk"
      })
        .then(() => {
          this.editableTabs = [];
          this.editableTabsValue = "1";
          this.activeIndex = "0";
          this.isOpeneds = [];
          this.$router.push({ name: "Home" });
        })
        .catch(action => {
          console.log(action);
        });
    },
    // saveNavState(activePath){
    //   window.sessionStorage.setItem('activePath', activePath)
    //   this.activePath = activePath;
    // }
  }
};
</script>

<style lang='less'>
.m-home {
  .m-hearImg {
    display: block;
    width: 60px;
    height: 60px;
  }
  .reset-btn {
  position: absolute;
  right: 0px;
  z-index: 1;
  line-height: 40px;
  width: 90px;
  text-align: center;
  .el-button{
    padding: 0 10px;
    height: 32px;
    line-height: 31px;
  }
}
}
</style>

