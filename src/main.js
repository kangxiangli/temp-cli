import Vue from 'vue'
import App from './App.vue'
import vCustomSteps from 'v-custom-steps'


Vue.use(vCustomSteps)
new Vue({
  el: '#app',
  render: h => h(App)
})
