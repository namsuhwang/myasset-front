import { createStore } from 'vuex'
import storeCommon from './modules/storeCommon';
import storeAuth from './modules/storeAuth';

const store = createStore({
  modules:{ 
    storeCommon,
    storeAuth
  }
});

export default store;