import Vue from "vue"
import eleEasyTable from './components/ele-easy-table.vue'

let MyPlugin = {
	version: '1.0.0'
};

MyPlugin.install = function(Vue) {

	if (this.installed) return;

	Vue.component(eleEasyTable.name, eleEasyTable)

};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
	MyPlugin.install(window.Vue);
}

Vue.use(MyPlugin)

export default MyPlugin