<template>
  <div class="m-view-masterMenu m-window">
    <div class="m-module">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item
          v-for="(item, index) in studyJavaScriptVueList"
          :key="item.id"
          :title="item.authName"
          :name="index"
        >
          <ul>
            <li v-for="child in item.children" :key="child.id" @click="addTab(child)">
              <i class="iconfont">&#xe662;</i>
              <span>{{child.authName}}</span>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudyJavaScriptVue",
  props: {
    addTab: {
      type: Function
    },
    removeTab: {
      type: Function
    }
  },
  data() {
    return {
      // 活动菜单下标
      activeName: 0,
      studyJavaScriptVueList: [
        {
          authName: "JavaScript基础用法",
          id: 1,
          order: 1,
          path: "JavaScript",
          children: [
            {
              authName: "JS拖拽",
              id: 1,
              order: 1,
              path: "JavaScriptdragAndDrop",
              children: null,
            },
          ],
        },
        {
          authName: "Vue基础用法",
          id: 2,
          order: 2,
          path: "Vue",
          children: [
            {
              authName: "Vue轮播",
              id: 1,
              order: 1,
              path: "VueShuffling",
              children: null,
            },
            {
              authName: "Vue轮播2",
              id: 2,
              order: 2,
              path: "VueShuffling2",
              children: null,
            },
            {
              authName: "Vue增删改查",
              id: 3,
              order: 3,
              path: "Addanddelete",
              children: null,
            },
            {
              authName: "Vue增删改查搜2",
              id: 4,
              order: 4,
              path: "Addanddelete2",
              children: null,
            },
            {
              authName: "Vue增删改查搜3",
              id: 5,
              order: 5,
              path: "Addanddelete3",
              children: null,
            },
            {
              authName: "Vue搜索",
              id: 6,
              order: 6,
              path: "search",
              children: null,
            },
          ],
        },
        {
          authName: "案例",
          id: 3,
          order: 3,
          path: "case",
          children: [
            {
              authName: "图书馆系统管理",
              id: 1,
              order: 1,
              path: "LibraryManagement",
              children: null,
            },
            {
              authName: "图书馆系统管理2",
              id: 2,
              order:2,
              path: "LibraryManagement2",
              children: null,
            },
          ],
        },
      ],
    };
  },
  methods: {},
};
</script>

<style lang='less'>


</style>
