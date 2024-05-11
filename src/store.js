import { createStore } from 'vuex';
import { supabase } from '@/clients/supabase';

export default createStore({

  state: {
    localLogin: false,
    userEmail: '',
    recordsList: [],
    searchList: [],
    searchList_up: [],
    searchList_ch: [],
    homeList: [], //keep it empty, value only after search
    homeList_up: [], //keep it empty, value only after search
    homeList_ch: [], //keep it empty, value only after search
  },

  mutations: {

    setLocalLogin(state, email) {
      state.localLogin = true;
      state.userEmail = email;
    },

    clearLocalLogin(state) {
      state.localLogin = false;
      state.userEmail = '';
    },

    uploadRecords(state, payload) {
      state.recordsList = payload.theList
    },

    uploadSearch(state, payload) {
      state.searchList = payload.theList
      state.searchList_up = payload.theList_up
      state.searchList_ch = payload.theList_ch
      state.homeList = payload.homeList
      state.homeList_up = payload.homeList_up
      state.homeList_ch = payload.homeList_ch
    },

    // uploadHome(state, payload) {
    //   state.homeList = payload.homeList
    //   // state.loadingFinish = true
    // },

    clearHome(state) {
      state.homeList = ''
      state.homeList_up = ''
      state.homeList_ch = ''
    },

  },

  actions: {
    async login({ commit }, { email, password, router }) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        console.log(error)
        alert('Email or password not correct')
      }
      else {
        commit('setLocalLogin', data.session.user.email)
        const currentRoute = router.currentRoute;
        if (currentRoute.path !== "/contacts") {
          router.push("/contacts"); 
        }

      }
    },

    async logout({ commit }, { router }) {
      try {
        const { error } = await supabase.auth.signOut();

        if (error) {
          throw error;
        }

        commit('clearLocalLogin')
        const currentRoute = router.currentRoute;
        if (currentRoute.path !== "/login") {
          router.push("/login"); // Navigate to the login page
        }
      } catch (error) {
        console.error('Error during sign out:', error);
        router.push("/login"); // If an error occurs, redirect to the login page
      }
    },

    async loadStateFromLocalStorage({ commit }) {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error)
      } else {
        if (data.session) {
          commit('setLocalLogin', data.session.user.email)
        } else {
          commit('clearLocalLogin')
        }
      }
    },

    uploadRecordsAction(context, payload) {
      context.commit('uploadRecords', payload)
    },

    uploadSearchAction(context, payload) {
      context.commit('uploadSearch', payload)
    },

    clearHomeAction(context){
      context.commit('clearHome')
    },

  },

  getters: {
    isLoggedIn(state) {
      return state.localLogin;
    },
    whichUser(state) {
      return state.userEmail;
    }
  }
});