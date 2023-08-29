import { Task } from '@/types/task';
import State from '@/types/state';
import db from '@/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, onSnapshot, updateDoc, query, where, limit } from 'firebase/firestore';
import router from '@/router';
const stateCollectionRef = collection(db, "State");
const LIMIT = 5;

export const taskModule = {
  namespaced: true,

  state: (): State => ({
    tasks: [],
    completedTasks: [],
    taskId: '',
    selectedSort: '',
    searchQuery: '',
    isLoading: true,
    isError: false,
    isRouted: false,
    sortOptions: [
      {
        value: '',
        label: 'Без сортировки'
      },
      {
        value: 'title',
        label: 'По названию'
      },
      {
        value: 'date',
        label: 'По дате'
      },
    ]
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
    }
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    getSortedTasks(state: State): Task[] {
      return [...state.tasks].sort((task1: Task, task2: Task) => {
        if (task1[state.selectedSort] instanceof Date) {
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
  },

  actions: {
    // функции вызывающие мутации, сами они не должны менять state
    async fetchTasks({commit, dispatch}) { //  {state, commit, ...}  = context
      try {
        const querySnapshot = await getDocs(stateCollectionRef);
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
            completed: doc.data().completed
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
            completed: change.doc.data().completed
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

    async addTask({ commit }, payload: Task) {
      try {
        commit('setLoading', true);
        await addDoc(stateCollectionRef, {
          title: payload.title,
          date: payload.date,
          importance: payload.importance,
          completed: payload.completed
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
          completed: !payload.completed
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
  }
}
