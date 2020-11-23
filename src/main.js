import Vue from 'vue'
import App from './App.vue'
import '../node_modules/reset-css/reset.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEnvelope, faCopy, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEnvelope,faCopy,faTimesCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
