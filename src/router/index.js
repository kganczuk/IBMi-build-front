import Vue from 'vue'
import Router from 'vue-router'

import IBMiBuild from '../components/IBMiBuild'
import ProgramDetails from '../components/ProgramDetails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IBMiBuild',
      component: IBMiBuild
    },
    {
      path: '/program/:name',
      component: ProgramDetails
    }
  ]
})
