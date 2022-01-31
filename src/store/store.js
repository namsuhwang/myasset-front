import { createStore } from 'vuex'
import StoreCommon from './modules/StoreCommon';
import StoreAuth from './modules/StoreAuth';

const store = createStore({
  modules:{ 
    StoreCommon,
    StoreAuth
  }
});

export default store;