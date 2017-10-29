import Vue from '../vue1'
import MyComponent from './my-component.vue'

var vm=new Vue({
    el:'#app',
    // render:c=>c(MyComponent)
    render:function (create) {
        create(MyComponent)
    }
})