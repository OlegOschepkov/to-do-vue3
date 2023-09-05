import NewUser from '@/types/newUser';
import UserState from '@/types/userState';
import LoginPayload from '@/types/loginPayload';
import router from '@/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";

const auth = getAuth();

export const authModule = {
  namespaced: true,

  state: (): UserState => ({
    user: {
      data: {}
    }
  }),

  mutations: {
    setUser(state, payload) {
      state.user.data = payload;
    },

    setClearState(state) {
      state.user.data = {}
    },
  },

  getters: {
    getUser(state) {
      return state.user
    }
  },

  actions: {
    async registerNewUser({ commit }, payload: NewUser) {
      try {
        const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        if (response) {
          commit('setUser', response.user)
          await updateProfile(response.user, {
            displayName: payload.name
          });
        }
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async logIn({ commit }, payload: LoginPayload) {
      try {
        const response = await signInWithEmailAndPassword(auth, payload.email, payload.password)
        if (response) {
          commit('setUser', response.user);
          router.push('/');
        }
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async logOut({ commit }) {
      try {
        await signOut(auth)
        commit('setUser', null)
        commit('setClearState', null)
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async fetchUser({ commit }) {
      try {
        await auth.onAuthStateChanged(function(user) {
          if (user) {
            commit('setUser', user)
          } else {
            commit('setUser', null)
          }
        });

      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    }
  }
}
