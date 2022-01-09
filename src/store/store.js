import { createStore } from 'vuex'
import StoreTotalAsset from './modules/StoreTotalAsset';
import StoreCommon from './modules/StoreCommon';

const store = createStore({
  modules:{
    StoreTotalAsset,
    StoreCommon
  }
});

export default store;