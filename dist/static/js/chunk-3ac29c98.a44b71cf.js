(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3ac29c98"],{"1b25":function(e,r,t){},4424:function(e,r,t){e.exports=t.p+"static/img/login.8735d1a2.jpg"},"6eca":function(e,r,t){"use strict";var n=t("1b25"),o=t.n(n);o.a},"9ed6":function(e,r,t){"use strict";t.r(r);var n=function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"login-container"},[n("img",{attrs:{src:t("4424"),alt:""}}),n("div",{staticClass:"login-box"},[e._m(0),n("el-form",{ref:"loginFormRef",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginFormRules,"label-width":"0px"}},[n("el-form-item",{attrs:{prop:"username"}},[n("el-input",{attrs:{"prefix-icon":"iconfont icon-user"},model:{value:e.loginForm.username,callback:function(r){e.$set(e.loginForm,"username",r)},expression:"loginForm.username"}})],1),n("el-form-item",{attrs:{prop:"password"}},[n("el-input",{attrs:{"prefix-icon":"iconfont icon-3702mima",type:"password"},model:{value:e.loginForm.password,callback:function(r){e.$set(e.loginForm,"password",r)},expression:"loginForm.password"}})],1),n("el-form-item",{staticClass:"btns"},[n("el-button",{attrs:{type:"primary"},on:{click:e.login}},[e._v("登录")]),n("el-button",{attrs:{type:"info"},on:{click:e.resetLoginForm}},[e._v("重置")])],1)],1)],1)])},o=[function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"avatar-box"},[n("img",{attrs:{src:t("cf05"),alt:""}})])}],s=(t("96cf"),t("1da1")),a={name:"login",data:function(){return{loginForm:{username:"admin",password:"123456"},loginFormRules:{username:[{required:!0,message:"请输入登录账号",trigger:"blur"},{min:3,max:10,message:"长度在3到10个字符",trigger:"blur"}],password:[{required:!0,message:"请输入登录密码",trigger:"blur"},{min:6,max:15,message:"长度在6到15个字符",trigger:"blur"}]}}},methods:{resetLoginForm:function(){this.$refs.loginFormRef.resetFields()},login:function(){var e=this;this.$refs.loginFormRef.validate(function(){var r=Object(s["a"])(regeneratorRuntime.mark((function r(t){var n,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(t){r.next=2;break}return r.abrupt("return");case 2:return r.next=4,e.$http.post("login",e.loginForm);case 4:if(n=r.sent,o=n.data,console.log("login:",o),200===o.meta.status){r.next=9;break}return r.abrupt("return",e.$message.error("登录失败"));case 9:e.$message.success("登录成功"),sessionStorage.setItem("username",e.loginForm.username),window.token=o.data.token,e.$auth.login(),e.$router.push("/home");case 14:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}())}}},i=a,l=(t("6eca"),t("2877")),u=Object(l["a"])(i,n,o,!1,null,null,null);r["default"]=u.exports},cf05:function(e,r,t){e.exports=t.p+"static/img/logo.99de3172.png"}}]);