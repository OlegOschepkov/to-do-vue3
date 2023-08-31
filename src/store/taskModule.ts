import { Task } from '@/types/task';
import NewUser from '@/types/newUser';
import LoginPayload from '@/types/loginPayload';
import State from '@/types/state';
import { db } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, setPersistence, browserSessionPersistence } from "firebase/auth";
import { collection, getDocs, addDoc, doc, deleteDoc, onSnapshot, updateDoc, query, where } from 'firebase/firestore';
import router from '@/router';
import { defaultSortOptions } from '@/types/sortOptions';

const stateCollectionRef = collection(db, "State");
const auth = getAuth();

export const taskModule = {
  namespaced: true,

  state: (): State => ({
    user: {
      data: {}
    },
    tasks: [],
    completedTasks: [],
    taskId: '',
    selectedSort: '',
    searchQuery: '',
    isLoading: true,
    isError: false,
    isRouted: false,
    sortOptions: defaultSortOptions
  }),

  mutations: {
    setTasks(state: State, payload: State) {
      if (payload && payload.tasks) {
        state.tasks = payload.tasks;
      }
    },

    setLoading(state: State, payload: boolean) {
      if (payload) {
        state.isLoading = payload
      } else {
        setTimeout(() => state.isLoading = payload, 300) // Убираю мигание при быстром ответе от сервера
      }
    },

    setError(state: State, payload: boolean) {
      state.isError = payload
    },

    setSelectedSort(state: State, payload: string) {
      state.selectedSort = payload
    },

    setSearchQuery(state: State, payload: string) {
      state.searchQuery = payload
    },

    setRouteState(state: State) {
      state.isRouted = true
    },

    setTaskIdToEdit (state: State, payload: string) {
      state.taskId = payload
    },

    setNewTaskToState(state: State, payload: Task) {
      state.tasks.push(payload);
    },

    setModifiedTaskInState(state: State, payload: Task) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
    },

    setDeleteTaskFromState(state: State, payload: Task) {
      state.tasks = state.tasks.filter(item => item.id !== payload.id);
    },

    setUser(state, payload) {
      state.user.data = payload;
    },

    setClearState(state) {
      console.log('setClearState')
      state.tasks = [];
      state.user.data = {}
    },
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    getSortedTasks(state: State): Task[] {
      return [...state.tasks].sort((task1: Task, task2: Task) => {
        if (task1[state.selectedSort] instanceof Date || typeof task1[state.selectedSort] === 'number') {
          return task1[state.selectedSort] - task2[state.selectedSort]
        } else {
          return task1[state.selectedSort]?.localeCompare(task2[state.selectedSort])
        }
      })
    },

    getRouteState (state: State): boolean {
      return state.isRouted;
    },

    getTaskById(state: State): Task {
      return [...state.tasks].filter((task) => task.id === state.taskId)[0];
    },

    getSortedAndSearchedActiveTasks(state: State, getters): Task[] {
      return getters.getSortedTasks.filter(item => item.completed === false).filter(task => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },

    getSortedAndSearchedCompletedTasks(state: State, getters): Task[] {
      return getters.getSortedTasks.filter(item => item.completed === true).filter((task) => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },

    getUser(state) {
      return state.user
    }
  },

  actions: {
    // функции вызывающие мутации, сами они не должны менять state
    async fetchTasks({state, commit, dispatch}) { //  {state, commit, ...}  = context
      try {
        console.log("Fetch tasks")
        // let loggedUser;
        await auth.onAuthStateChanged(function(user) {
          if (user) {
            console.log(user)
            commit('setUser', user)
          }
        });
        // if (!loggedUser) return;
        // commit('setUser', loggedUser)

        const queryRef = query(
          stateCollectionRef,
          where("author", "==", state.user.data.uid ? state.user.data.uid : 'all')
        );
        const querySnapshot = await getDocs(queryRef);
        const tempObjForTasks = {
          tasks: [] as Task[]
        };
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const tempTask: Task = {
            id: doc.id,
            date: doc.data().date.toDate(),
            title: doc.data().title,
            importance: doc.data().importance,
            completed: doc.data().completed,
            completedAt: doc.data().completedAt?.toDate(),
          }
          tempObjForTasks.tasks.push(tempTask);
        });

        commit('setTasks', tempObjForTasks);
        commit('setRouteState');
        dispatch('startListener');
      } catch (e) {
        commit('setError', true);
        console.log(e.message)
      } finally {
        commit('setLoading', false);
      }
    },

    startListener({state, commit}) {
      let startListening = false;
      commit('setLoading', true);
      state.unsubscribe = onSnapshot(stateCollectionRef, { includeMetadataChanges: false }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const tempTask: Task = {
            id: change.doc.id,
            date: change.doc.data().date.toDate(),
            title: change.doc.data().title,
            importance: change.doc.data().importance,
            completed: change.doc.data().completed,
            completedAt: change.doc.data().completedAt?.toDate()
          }
          if (startListening) {
            if (change.type === "added") {
              commit('setNewTaskToState', tempTask);
            }
            if (change.type === "modified") {
              commit('setModifiedTaskInState', tempTask);
            }
            if (change.type === "removed") {
              commit('setDeleteTaskFromState', tempTask);
            }
          }
        });
        startListening = true;
        commit('setLoading', false);
      });
    },

    stopListener({state}) {
      state.unsubscribe();
    },

    async addTask({ state, commit }, payload: Task) {
      try {
        commit('setLoading', true);
        await addDoc(stateCollectionRef, {
          title: payload.title,
          date: payload.date,
          importance: payload.importance,
          completed: payload.completed,
          author: state.user.data.uid,
        });
        commit('setLoading', false);
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async deleteTask({ commit }, payload: string) {
      try {
        commit('setLoading', true);
        await deleteDoc(doc(stateCollectionRef, payload));
        commit('setLoading', false);
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async completeTask({ commit }, payload: Task) {
      try {
        commit('setLoading', true);
        const modifiedTask = doc(stateCollectionRef, payload.id);
        await updateDoc(modifiedTask, {
          completed: !payload.completed,
          completedAt: new Date(Date.now())
        });
        commit('setLoading', false);
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async editTask({ commit }, payload: Task) {
      try {
        const modifiedTask = doc(stateCollectionRef, payload.id);
        commit('setLoading', true);
        await updateDoc(modifiedTask, {
          date: payload.date,
          title: payload.title,
          importance: payload.importance,
          completed: payload.completed
        });
        commit('setLoading', false);
        router.push('/todo-list');
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async registerNewUser({ commit }, payload: NewUser) {
      try {
        const response = await createUserWithEmailAndPassword(auth, payload.email, payload.password);
        if (response) {
          console.log(2)

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
          console.log(payload)
          console.log(response.user)

          commit('setUser', response.user);
          // router.push('/');
        }
      } catch (e) {
        commit('setError', true);
        console.log(e);
        console.log(e.message);
      }
    },

    async logOut({ commit }) {
      try {
        await signOut(auth)
        console.log(4)

        commit('setUser', null)
        commit('setClearState', null)
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },

    async fetchUser({ commit }, user) {
      try {
        if (user) {
          console.log(5)
          console.log(user)

          commit("setUser", user);
        } else {
          console.log(6)

          commit("setUser", null);
        }
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    }
  }
}
