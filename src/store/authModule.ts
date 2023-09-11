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
    },
    error: {
      isError: false,
      errorCode: ''
    },
    isLoading: false
  }),

  mutations: {
    setLoading(state: UserState, payload: boolean) {
      if (payload) {
        state.isLoading = payload
      } else {
        setTimeout(() => state.isLoading = payload, 300) // Убираю мигание при быстром ответе от сервера
      }
    },

    setUser(state: UserState, payload: object) {
      state.user.data = payload;
    },

    setClearState(state: UserState) {
      state.user.data = {}
    },

    setError(state: UserState, payload) {
      state.error = {
        isError: payload.isError,
        errorCode: payload.errorCode
      }
    }
  },

  getters: {
    getUser(state: UserState) {
      return state.user
    },

    getError(state: UserState) {
      return state.error
    }
  },

  actions: {
    async registerNewUser({ commit }, payload: NewUser) {
      try {
        commit('setLoading', true);
        const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        if (response) {
          commit('setUser', response.user)
          await updateProfile(response.user, {
            displayName: payload.name
          });
          await router.push('/');
          commit('setError', {
            isError: false,
            errorCode: 'none'
          });
        }
        commit('setLoading', false);
      } catch (e) {
        commit('setError', {
          isError: true,
          errorCode: e.code
        });
        console.log(e.message);
        commit('setLoading', false);

      }
    },

    async logIn({ commit }, payload: LoginPayload) {
      try {
        commit('setLoading', true);
        const response = await signInWithEmailAndPassword(auth, payload.email, payload.password);
        if (response) {
          commit('setUser', response.user);
          await router.push('/');
          commit('setError', {
            isError: false,
            errorCode: 'none'
          });
        }
        commit('setLoading', false);
      } catch (e) {
        commit('setError', {
          isError: true,
          errorCode: e.code
        });
        console.log(e.message);
        commit('setLoading', false);
      }
    },

    async logOut({ commit }) {
      try {
        commit('setLoading', true);
        await signOut(auth)
        commit('setUser', null)
        commit('setClearState', null)
        commit('setError', {
          isError: false,
          errorCode: 'none'
        });
        commit('setLoading', false);
      } catch (e) {
        commit('setError', {
          isError: true,
          errorCode: e.code
        });
        console.log(e.message);
        commit('setLoading', false);
      }
    },

    async fetchUser({ commit }) {
      try {
        commit('setLoading', true);
        await auth.onAuthStateChanged(function(user) {
          if (user) {
            commit('setUser', user)
          } else {
            commit('setUser', null)
          }
        });
        commit('setError', {
          isError: false,
          errorCode: 'none'
        });
        commit('setLoading', false);
      } catch (e) {
        commit('setError', {
          isError: true,
          errorCode: e.code
        });
        console.log(e.message);
        commit('setLoading', false);
      }
    }
  }
}
