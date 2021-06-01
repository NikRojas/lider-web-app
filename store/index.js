export const state = () => ({
    menu_open : false,
    footer: {},
    menu: {},
    page: {},
    customer: {},
    errorMessage: '',
    expireLS: null 
});

export const mutations = {
    GET_LAYOUT(state, layout) {
        state.footer = layout.data.footer;
        state.menu = layout.data.menu;
        //state.form = layout.data.form;
    },
    SET_MENU_OPEN(state){
        state.menu_open = !state.menu_open; 
    },
    SET_CURRENT_PAGE(state, page){
        state.page = page; 
    },
    SET_CUSTOMER(state, customer){
        state.customer = Object.assign({},customer); 
    },
    SET_ERROR_MESSAGE(state, message){
        state.errorMessage = message; 
    },
    SET_EXPIRE_LS(state, expire){
        state.expireLS = expire; 
    },
}

export const actions = {
    async getLayout({ commit, state }){
        const { data } = await this.$axios.get('/api/layout')
        commit('GET_LAYOUT', data);
    },
    setMenuOpen({ commit}){
        commit('SET_MENU_OPEN');
    },
    setCurrentPage({ commit}, page){
        commit('SET_CURRENT_PAGE', page);
    },
    async nuxtServerInit({ dispatch }) {
        await dispatch('getLayout');
    },
    setCustomer({ commit}, customer){
        commit('SET_CUSTOMER', customer);
    },
    setErrorMessage({ commit}, message){
        commit('SET_ERROR_MESSAGE', message);
    },
    setExpireLS({ commit}, expire){
        commit('SET_EXPIRE_LS', expire);
    },
}

export const getters = {
    getMenu: state => {
        return state.menu;
    },
    getCurrentPage: state => {
        return state.page;
    },
    getFooter: state => {
        return state.footer;
    },
    getMenuOpen: state => {
        return state.menu_open
    },
    getCustomer: state => {
        return state.customer
    },
    getErrorMessage: state => {
        return state.errorMessage
    },
    getExpireLS: state => {
        return state.expireLS
    },
}

