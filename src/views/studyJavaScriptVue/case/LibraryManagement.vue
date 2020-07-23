<template>
  <div class="LibraryManagement">
      <div>
        <div v-if="books.length">
            <table >
            <thead>
                <tr>
                    <th></th>
                    <th>书名</th>
                    <th>价格</th>
                    <th>数量</th>
                    
                    <th>操作</th>
                </tr>
                
            </thead>
            <tbody>
                <tr v-for="(item,index) in books">
                    <td>{{index+1}}</td>
                    <td>{{item.name}}</td>
                    <td>{{item.price | showPrice}}</td>
                    <td>
                       <button @click="sub(index)" v-bind:disabled="item.count <=1">-</button> {{item.count}}
                       <button @click="add(index)">+</button>
                    </td>
                       
                       <td><button @click="remove(index)">移除</button></td>
                       
                </tr>
            </tbody>
        </table>
        <h2>总价格：{{totalPrice | showPrice}}</h2>
        </div>
        <h2 v-else>购物车为空</h2>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      books:[
                    {
                        id:'1',
                        name:'三国演义',
                        price: 15.00,
                        count:1
                    },
                    {
                        id:'1',
                        name:'三国演义',
                        price: 25.00,
                        count:1
                    },
                    {
                        id:'1',
                        name:'三国演义',
                        price: 35.00,
                        count:1
                    },
                    {
                        id:'1',
                        name:'三国演义',
                        price: 45.00,
                        count:1
                    },
                ]
    }
  },
  computed:{
                totalPrice(){
                    let totalPrice = 0;
                    for(let i=0;i<this.books.length;i++){
                        totalPrice += this.books[i].price * this.books[i].count
                    }
                    return totalPrice
                }
            },

            methods:{
                sub(index){
                    this.books[index].count--;
                },
                add(index){
                    this.books[index].count++;
                },
                remove(index){
                    this.books.splice(index,1);
                }
            },
            filters:{
                showPrice(price){
                    return '￥' + price.toFixed(2)
                }
            }
}
</script>

<style lang='less'>

</style>
