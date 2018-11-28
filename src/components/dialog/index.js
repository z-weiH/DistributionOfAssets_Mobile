import dialog from './dialog';
import Vue from 'vue';

let DialogConstructor = Vue.extend(dialog);
let instance;

const Dialog = function (options) {

  if(!instance){
    instance = new DialogConstructor();
    instance.vm = instance.$mount();
    document.body.appendChild(instance.vm.$el);
  }
  console.log(instance.vm);
  return instance.vm.showDialog(options);

}

export default Dialog;
