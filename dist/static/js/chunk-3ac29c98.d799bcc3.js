(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ac29c98"],{"1b25":function(e,t,r){},4424:function(e,t,r){e.exports=r.p+"static/img/login.8735d1a2.jpg"},"6eca":function(e,t,r){"use strict";var n=r("1b25"),o=r.n(n);o.a},"9ed6":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("img",{attrs:{src:r("4424"),alt:""}}),n("div",{staticClass:"login-box"},[e._m(0),n("el-form",{ref:"loginFormRef",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginFormRules,"label-width":"0px"}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{"prefix-icon":"iconfont icon-user"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{"prefix-icon":"iconfont icon-3702mima",type:"password"},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),n("el-form-item",{staticClass:"btns"},[n("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")]),n("el-button",{attrs:{type:"info"},on:{click:e.resetLoginForm}},[e._v("重置")])],1)],1)],1)])},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"avatar-box"},[n("img",{attrs:{src:r("cf05"),alt:""}})])}],s=(r("96cf"),r("1da1")),i={name:"login",data:function(){return{loginForm:{username:"admin",password:"123456"},loginFormRules:{username:[{required:!0,message:"请输入登录账号",trigger:"blur"},{min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}],password:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:15,message:"长度在6到15个字符",trigger:"blur"}]}}},methods:{resetLoginForm:function(){this.$refs.loginFormRef.resetFields()},login:function(){var e=this;this.$refs.loginFormRef.validate(function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(r){var n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(r){t.next=2;break}return t.abrupt("return");case 2:return t.next=4,e.$http.post("login",e.loginForm);case 4:if(n=t.sent,o=n.data,console.log("login:",o),200===o.meta.status){t.next=9;break}return t.abrupt("return",e.$message.error("登录失败"));case 9:e.$message.success("登录成功"),window.token=o.data.token,e.$auth.login(),e.$router.push("/home");case 13:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}())}}},a=i,l=(r("6eca"),r("2877")),c=Object(l["a"])(a,n,o,!1,null,null,null);t["default"]=c.exports},cf05:function(e,t,r){e.exports=r.p+"static/img/logo.99de3172.png"}}]);