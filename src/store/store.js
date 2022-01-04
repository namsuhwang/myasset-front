import { createStore } from 'vuex'
import StoreTotalAsset from './modules/StoreTotalAsset';

const store = createStore({
  modules:{
    StoreTotalAsset: StoreTotalAsset
  }
});

export default store;