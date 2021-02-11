export const state = () => ({
    menu_open : false,
    footer: {},
    menu: {},
    //form: {},
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
}

export const actions = {
    async getLayout({ commit, state }){
        const { data } = await this.$axios.get('/api/layout')
        commit('GET_LAYOUT', data);
    },
    setMenuOpen({ commit}){
        commit('SET_MENU_OPEN');
    },
    async nuxtServerInit({ dispatch }) {
        await dispatch('getLayout');
    },
}

export const getters = {
    getMenu: state => {
        return state.menu;
    },
    getFooter: state => {
        return state.footer;
    },
    getMenuOpen: state => {
        return state.menu_open
    },
}

