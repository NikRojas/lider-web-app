import Vue from 'vue'
export const state = () => ({
    menu_open : false,
    footer: {},
    menu: {},
    page: {},
    customer: {},
    filters: {},
    errorMessage: '',
    expireLS: null,
    chatMessages: [],
    chatServerResponse: false,
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
    //Chat
    SET_CHAT_SERVER_RESPONSE(state) {
        state.chatServerResponse = !state.chatServerResponse;
    },
    SET_VALUE_CHAT_SERVER_RESPONSE(state, value) {
        state.chatServerResponse = value;
    },
    SET_CONVERSATION(state, conversation) {
        Vue.set(state, 'chatMessages', [...conversation]);
    },
    SET_MESSAGE(state, chatMessage) {
        state.chatMessages.push(chatMessage);
    },
    SET_FILTERS(state, filters){
        //state.filters = filters; 
        state.filters = Object.assign({}, filters);
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
    //Chat
    setConversation({ commit }, conversation) {
        commit('SET_CONVERSATION', conversation);
    },
    setMessage({ commit }, chatMessage) {
        //const el = { date: new Date().toLocaleString, message: chatMessage };
        commit('SET_MESSAGE', chatMessage);
    },
    setChatServerResponse({ commit }) {
        commit('SET_CHAT_SERVER_RESPONSE');
    },
    setValueChatServerResponse({ commit, value }) {
        commit('SET_VALUE_CHAT_SERVER_RESPONSE', value);
    },
    setFilters({ commit}, filters){
        commit('SET_FILTERS', filters);
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
    //Chat
    getChatMessages: state => {
        return state.chatMessages;
    },
    getChatServerResponse: state => {
        return state.chatServerResponse;
    },
    getFilters: state => {
        return state.filters
    },
}

