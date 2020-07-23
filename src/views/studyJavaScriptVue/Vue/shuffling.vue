<template>
  <div class="m-swiper">
    <div class="imgItems" @mouseover="mouseOver" @mouseout="mouseOut">
      <img src="@/assets/img/111.jpg" alt="" class="img indexZ">
      <img src="@/assets/img/222.jpg" alt="" class="img">
      <img src="@/assets/img/333.jpg" alt="" class="img">
      <img src="@/assets/img/444.jpg" alt="" class="img">
      <img src="@/assets/img/555.jpg" alt="" class="img">

      <div class="imgIndexs">
        <div class="imgIndex" v-for="(item,index) in imgCount"
             @mouseover="indexBtn(index)" :class="{indexBGC:currentIndex == index}">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgCount:0, //图片个数
       currentIndex:0, //当前图片
       intervalID:'', //停止interval的唯一id
    }
  },
  mounted(){
       this.imgCount = document.getElementsByTagName("img").length;
       setTimeout(()=>{
         // 开始播放
         this.startTime();
       },10)
     },
  methods:{
       /**
        * 鼠标移动到图片上
        */
       mouseOver(){
         this.stopTime()
       },
       /**
        * 鼠标移出图片
        */
       mouseOut(){
         this.startTime();
       },
       /**
        * 点击圆圈
        */
       indexBtn(index){
         this.currentIndex = index
         this.selectImg(index);
       },
       /**
        * 选中对应的图片设置层级类
        */
       selectImg(index){
         let imgList = document.getElementsByClassName("img");
         this.clearClass(imgList);
         imgList[index].className = "img indexZ"
       },
       /**
        * 层级复位
        */
       clearClass(array){
         for (let i=0 ; i<array.length ; i++){
           array[i].className = "img"
         }
       },

       /**
        * 开始循环播放图片
        */
       startTime(){
         this.intervalID = window.setInterval(()=>{
           this.currentIndex++;
           if(this.currentIndex > 4){
             this.currentIndex = 0
           }
           this.selectImg(this.currentIndex)
           },3000)
       },
       /**
        * 鼠标移到图片上时停止图片播放
        */
       stopTime(){
         window.clearInterval(this.intervalID)
       }
     }
}
</script>

<style lang='less'>
.my-swiper {
  display: flex;
  align-items: center;
  justify-content: center;
}
.img{
      width: 100%;
      height: 100%;
      position: absolute;
    }
    .imgItems{
      position: relative;
      width: 200px;
      height: 200px;
      margin: auto;
    }
    /*圆圈居中水平排列*/
    .imgIndexs{
      display: flex;
      justify-content: center;
      width: 100%;
      position: absolute;
      bottom: 8px;
    }
    /*图片所对应的圆圈*/
    .imgIndex{
      margin-left: 5px;
      width: 8px;
      height: 8px;
      border: 1px solid #EEEEEE;
      border-radius: 50%;
      background-color: #EEEEEE;
      z-index: 100;
    }
    /*设置层级，显示图片*/
    .indexZ{
      z-index: 10;
    }
    /*选中对应的圆圈设置背景颜色*/
    .indexBGC{
      background-color: blue;
    }
</style>
