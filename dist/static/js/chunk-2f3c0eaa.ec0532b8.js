(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2f3c0eaa"],{"0ab8":function(t,n,e){t.exports=e.p+"static/img/555.a7dd7eb8.jpg"},"160d":function(t,n,e){},"1c1d":function(t,n,e){"use strict";var s=e("160d"),i=e.n(s);i.a},2806:function(t,n,e){t.exports=e.p+"static/img/333.80a7e246.jpg"},"6d34":function(t,n,e){t.exports=e.p+"static/img/111.a54937f9.jpg"},"8afe":function(t,n,e){"use strict";e.r(n);var s=function(){var t=this,n=t.$createElement,s=t._self._c||n;return s("div",{staticClass:"m-swiper m-window"},[s("div",{staticClass:"imgItems",on:{mouseover:t.mouseOver,mouseout:t.mouseOut}},[s("img",{staticClass:"img indexZ",attrs:{src:e("6d34"),alt:""}}),s("img",{staticClass:"img",attrs:{src:e("92cf"),alt:""}}),s("img",{staticClass:"img",attrs:{src:e("2806"),alt:""}}),s("img",{staticClass:"img",attrs:{src:e("9288"),alt:""}}),s("img",{staticClass:"img",attrs:{src:e("0ab8"),alt:""}}),s("div",{staticClass:"imgIndexs"},t._l(t.imgCount,(function(n,e){return s("div",{staticClass:"imgIndex",class:{indexBGC:t.currentIndex==e},on:{mouseover:function(n){return t.indexBtn(e)}}})})),0)])])},i=[],a={props:{addTab:{type:Function},removeTab:{type:Function}},data:function(){return{imgCount:0,currentIndex:0,intervalID:""}},mounted:function(){var t=this;this.imgCount=document.getElementsByTagName("img").length,setTimeout((function(){t.startTime()}),10)},methods:{mouseOver:function(){this.stopTime()},mouseOut:function(){this.startTime()},indexBtn:function(t){this.currentIndex=t,this.selectImg(t)},selectImg:function(t){var n=document.getElementsByClassName("img");this.clearClass(n),n[t].className="img indexZ"},clearClass:function(t){for(var n=0;n<t.length;n++)t[n].className="img"},startTime:function(){var t=this;this.intervalID=window.setInterval((function(){t.currentIndex++,t.currentIndex>4&&(t.currentIndex=0),t.selectImg(t.currentIndex)}),3e3)},stopTime:function(){window.clearInterval(this.intervalID)}}},c=a,r=(e("1c1d"),e("2877")),o=Object(r["a"])(c,s,i,!1,null,null,null);n["default"]=o.exports},9288:function(t,n,e){t.exports=e.p+"static/img/444.77478f17.jpg"},"92cf":function(t,n,e){t.exports=e.p+"static/img/222.eb11cc17.jpg"}}]);