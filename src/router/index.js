import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import table from '../components/table.vue'
import account from '../components/accountstander.vue'
import money from '../components/moneystander.vue'
import allecharts from '../components/hospital.vue'
import people from '../components/people.vue'
import usertable from '../components/usertable.vue'
import owner from '../components/owner.vue'
import ownerrecord from '../components/ownerrecord.vue'
import total from '../components/total.vue'
import hospitaljixiao from '../components/hospitaljixiao.vue'
import bumenjixiao from '../components/bumenjixiao.vue'
import keshijixiao from '../components/keshijixiao.vue'
import gangweijixiao from '../components/gangweijixiao.vue'
import text from '../components/texs.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/text',
      name: 'text',
      component: text
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/usertable',
      name: 'usertable',
      component: usertable,
      redirect:'/owner',
      children:[{
        path:'/owner',
        name:'owner',
        component: owner,
      },{
        path:'/ownerrecord',
        name:'ownerrecord',
        component: ownerrecord,
      },,{
        path:'/total',
        name:'total',
        component: total,
      }]
    },
    {
      path: '/table',
      name: 'table',
      component: table,
      redirect: '/hospital',
      children:[{
        path:'/accountstander',
        name:'accountstander',
        component: account,
      },{
        path:'/moneystander',
        name:'moneystander',
        component: money,
      },{
        path:'/hospital',
        name:'hospital',
        component: allecharts,
      },{
        path:'/people',
        name:'people',
        component: people,
      },{
        path:'/hospitaljixiao',
        name:'hospitaljixiao',
        component: hospitaljixiao,
      },{
        path:'/bumenjixiao',
        name:'bumenjixiao',
        component: bumenjixiao,
      },{
        path:'/keshijixiao',
        name:'keshijixiao',
        component: keshijixiao,
      },{
        path:'/gangweijixiao',
        name:'gangweijixiao',
        component: gangweijixiao,
      }]
    }
  ]
})
