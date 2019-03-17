import Vue from "vue";
import Vuex from "vuex";

import lists from "./module-lists";
import users from "./module-users";
import UUID from "vue-uuid";

Vue.use(UUID);
Vue.use(Vuex);

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      lists,
      users
    }
  });

  return Store;
}
