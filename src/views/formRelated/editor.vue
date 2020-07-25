<template>
  <div class="m-editor m-window">
   <div class="container">
            <div class="plugins-tips">
                Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。
                访问地址：<a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
            </div>
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
export default {
  props:{
    addTab:{
      type:Function
    },
    removeTab:{
      type:Function
    },
  },
  name: 'editor',
        data: function(){
            return {
                content: '',
                editorOption: {
                    placeholder: 'Hello World'
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        }
}
</script>

<style lang='less'>
.editor-btn{
        margin-top: 20px;
    }
</style>
