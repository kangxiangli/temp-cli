import mycomponent from './v-svg-chain.vue'
const vSvgChain = {
  install: function(Vue) {
    Vue.component('vSvgChain', mycomponent)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vSvgChain)
}
export default vSvgChain
