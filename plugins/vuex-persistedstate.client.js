import createPersistedState from 'vuex-persistedstate'
import SecureLS from "secure-ls";
var ls = new SecureLS({ isCompression: false });

export default ({store}) => {
  createPersistedState({
    key: 'oh22o2t7t55222t5',
    paths: ['customer','expireLS'],
    /*fetchBeforeUse: true,
    storage: {
      getItem: (key) => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: (key) => ls.remove(key),
    },*/
    //...
  })(store)
}