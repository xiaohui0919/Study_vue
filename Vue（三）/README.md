# 学习笔记

## 路由

> vue-router.js

### 路由创建
```html
<div id="app">
    <router-link to="/login">login组件</router-link>
    <router-link to="/register">register组件</router-link>
    <router-view></router-view>
</div>

```
```javascript
// 创建路由
    var login = Vue.extend({
        template: '<div>login组件</div>'
    })
    var register = Vue.extend({
        template: '<div>register组件</div>'
    })
    // 实例化vuerouter
    var router = new VueRouter({
        routes: [
            {name:'login名称',path: '/login', component: login},
            {name:'register名称',path: '/register', component: register}
        ]
    })

    var vm = new Vue({
        el: '#app',
        router:router
    })
```

### 路由的嵌套
```html
<div id="app">
    <router-link to="/account/login">login组件</router-link>
    <router-link to="/account/register">register组件</router-link>
    <router-view></router-view>
</div>
```
```javascript
var account=Vue.extend({
        template:'<div>account组件<router-view></router-view></div>'
    })
    var login=Vue.extend({
        template:'<div>login组件</div>'
    })
    var register=Vue.extend({
        template:'<div>register组件</div>'
    })
    var router=new VueRouter({
        routes:[
            {path:'/account',component:account,children:[
                {path:'login',component:login},
                {path:'register',component:register}
            ]}
        ]
    })
    var vm=new Vue({
        el:'#app',
        router
    })
```
### 路由嵌套的传值
```html
<div id="app">
    <router-link to="/account/login">login组件</router-link>
    <router-link to="/account/register/100">register组件</router-link>
    <router-view></router-view>
</div>
```
```javascript
var account=Vue.extend({
        template:'<div>account组件<router-view></router-view></div>'
    })
    var login=Vue.extend({
        template:'<div>login组件</div>'
    })
    var register=Vue.extend({
        template:'<div>register组件---{{msg}}</div>',
        props:['id'],
        data:function () {
            return {
                msg:0
            }
        },
        created:function () {
            this.msg=this.$route.params.id
        }
    })
    var router=new VueRouter({
        routes:[
            {path:'/account',component:account,children:[
                {path:'login',component:login},
                {path:'register/:id',component:register}
            ]}
        ]
    })
    var vm=new Vue({
        el:'#app',
        router,
        watch:{
            '$route':function (newValue,oldValue) {
                console.log(oldValue);
                console.log(newValue);
            }
        }
    })
```

## watch(监听)

### 简单使用
```html
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    {{fullName}}
</div>
```
```javascript
var vm=new Vue({
        el:'#app',
        data:{
            firstName:'梅',
            lastName:'豪',
            fullName:'美好'
        },
        watch:{
            firstName:function (newValue,oldValue) {
                //  console.log(oldValue);
                //  console.log(newValue);
                this.fullName=this.firstName+this.lastName
            },
            lastName:function (newValue,oldValue) {
                this.fullName=this.firstName+this.lastName
            }
        }
    })
```
### 监听路由的变化
```html
<div id="app">
    <router-link to="/account/login">login组件</router-link>
    <router-link to="/account/register">register组件</router-link>
    <router-view></router-view>
</div>
```
```javascript
var account=Vue.extend({
        template:'<div>account组件<router-view></router-view></div>'
    })
    var login=Vue.extend({
        template:'<div>login组件</div>'
    })
    var register=Vue.extend({
        template:'<div>register组件</div>'
    })
    var router=new VueRouter({
        routes:[
            {path:'/account',component:account,children:[
                {path:'login',component:login},
                {path:'register',component:register}
            ]}
        ]
    })
    var vm=new Vue({
        el:'#app',
        router,
        watch:{
            '$route':function (newValue,oldValue) {
                  console.log(oldValue);
                  console.log(newValue);
            }
        }
    })
```

## computed 计算属性(作用：监听---推荐使用)
>计算属性是基于它们的依赖进行缓存的。计算属性只有在它的相关依赖发生改变时才会重新求值。
```html
<div id="app">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    {{fullName}}
</div>
```
```javascript
var vm=new Vue({
        el:'#app',
        data:{
            firstName:'梅',
            lastName:'豪'
        },
        computed:{
            'fullName':function () {
                return this.firstName+this.lastName
            }
        }
    })
```




