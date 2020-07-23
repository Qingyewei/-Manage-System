<template>
  <div class="m-window">
        <div>
            <h1>用户管理</h1>
            <input type="text" placeholder="search" @input="search">
            <table>
                <thead>
                    <tr>
                    <th>用户名</th>
                    <th>年龄</th>
                    <th>毕业学校</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                    <template v-for="(item,index) in slist">
                        <tr>
                            <td>{{item.name}}</td>
                            <td>{{item.age}}</td>
                            <td>{{item.school}}</td>
                            <td>{{item.remark}}</td>
                            <td><button @click="edit(item)">编辑</button>&nbsp;&nbsp;
                            <button @click="Delete(item.id)">删除</button></td>
                            <!-- <td><a href="#" @click="Edit(list)">编辑</a>&nbsp;&nbsp;<a href="#" @click="Delete(list.Id)">删除</a></td> -->
                        </tr>
                    </template>
                    <tr>
                        <td><input type="text" v-model="listtemplate.name"></td>
                        <td><input type="text" v-model="listtemplate.age"></td>
                        <td><select v-model="listtemplate.school">
                            <option >中山小学</option>
                            <option>复兴小学</option>
                            <option>光明小学</option>
                        </select></td>
                        <td><input type="text " v-model="listtemplate.remark"></td>
                        <td><button type="button" @click="save">保存</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
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
  data() {
    return {
      slist:[],
                searchlist:[],
                showli:false,
                inputsearch:'',
                searcharr:[],
                list:[
                    {id:1,name:'小哥',age:'18',school:'光明小学',remark:'三好学生'},
                    {id:2,name:'小刚',age:'11',school:'复兴小学',remark:'优秀班干部'},
                    {id:3,name:'小里',age:'12',school:'光明小学',remark:'三好学生2号'},
                    {id:4,name:'小与',age:'13',school:'复兴小学',remark:'最好学生'},
                    {id:5,name:'小繁荣',age:'20',school:'光明小学',remark:'有钱人'},
                ],
                listtemplate:{id:0,name:'',age:'',school:'',remark:''}
    };
  },
  created(){
                this.setSlist(this.list);
            },
            methods:{
                save(event){
                    if(this.listtemplate.id == 0){
                        this.listtemplate.id = this.list.length + 1;
                        this.list.push(this.listtemplate);
                    }
                    this.listtemplate = {id:0,name:'',age:'',school:'',remark:''}
                    // this.list.unshift(
                    //     ...this.listtemplate
                    // )
                },
                Delete(id){
                    for(var i = 0;i<this.slist.length;i++){
                        if(this.slist[i].id == id){
                            this.slist.splice(i,1);
                            break;
                        }
                    }
                },
                edit(list){
                    this.listtemplate = list;
                },
                setSlist(arr){
                    this.slist = JSON.parse(JSON.stringify(arr));
                },
                search(e){
                    var v =e.target.value,
                    self = this;
                    self.searchlist = [];
                    if(v){
                        var ss = [];
                        this.list.forEach(function(list) {
                            if(list.name.indexOf(v) > -1){
                                if(self.searchlist.indexOf(list.name) == -1){
                                    self.searchlist.push(list.name);
                                }
                                ss.push(list);
                            }
                            else if (list.age.indexOf(v)> -1){
                                if(self.searchlist.indexOf(list.age) == -1){
                                    self.searchlist.push(list.age);
                                }
                                ss.push(list);
                            }
                        });
                        this.setSlist(ss);
                    }
                    else{
                        this.setSlist(this.list);
                    }
                },
            }
};
</script>

<style lang='less'>
table thead tr th {
  text-align: center;
}
</style>
