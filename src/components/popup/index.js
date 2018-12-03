// import VueSlimPopup from './SlimPopup'
import SlimPopup from './SlimPopup'

// const SlimPopup = {
//   install: function(Vue) {
//     Vue.component(VueSlimPopup.name, VueSlimPopup)
//   }
// }
SlimPopup.install = function (Vue) {
  Vue.component(SlimPopup.name, SlimPopup)
}

export default SlimPopup
