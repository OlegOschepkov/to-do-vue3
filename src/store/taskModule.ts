import Task from '@/types/task';
import State from '@/types/state';
import db from '@/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, onSnapshot, updateDoc } from 'firebase/firestore';
const stateCollectionRef = collection(db, "State");

export const taskModule = {
  namespaced: true,

  state: (): State => ({
    tasks: [],
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
      state.isLoading = payload
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

    addTaskToState(state: State, payload: Task) {
      state.tasks.push(payload);
    },

    modifyTaskInState(state: State, payload: Task) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
    },

    deleteTaskFromState(state: State, payload: Task) {
      state.tasks = state.tasks.filter(item => item.id !== payload.id);
    }
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    getSortedTasks(state: State): Task[] {
      return [...state.tasks].sort((task1: Task, task2: Task) => {
        if (typeof task1[state.selectedSort] === 'number') {
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
      console.log(state.taskId)
      return [...state.tasks].filter((task) => task.id === state.taskId)[0];
    },

    // getTaskById: state => id => { Другой вариант. Внимание! двойная стрелочка
    //   return [...state.tasks].filter((task) => task.id === id)[0];
    // },

    getSortedAndSearchedTasks(state: State, getters): Task[] {
      return getters.getSortedTasks.filter((task) => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
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
            title: doc.data().title
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
      state.unsubscribe = onSnapshot(stateCollectionRef, { includeMetadataChanges: false }, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          const tempTask: Task = {
            id: change.doc.id,
            date: change.doc.data().date.toDate(),
            title: change.doc.data().title
          }
          if (startListening) {
            if (change.type === "added") {
              commit('addTaskToState', tempTask);
            }
            if (change.type === "modified") {
              commit('modifyTaskInState', tempTask);
            }
            if (change.type === "removed") {
              commit('deleteTaskFromState', tempTask);
            }
          }
        });
        startListening = true
        // TODO добавить Loading
      });
    },

    stopListener({state}) {
      state.unsubscribe();
    },

    async addTask({ commit, state }, payload: Task) {
      try {
        await addDoc(stateCollectionRef, {
          title: payload.title,
          date: payload.date,
        });
        // TODO добавить Loading
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },

    async deleteTask({ commit, state }, payload: string) {
      try {
        await deleteDoc(doc(stateCollectionRef, payload));
        // TODO добавить Loading
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },

    async editTask({ commit, state }, payload: Task) {
      try {
        const modifiedTask = doc(stateCollectionRef, payload.id);
        await updateDoc(modifiedTask, {
          date: payload.date,
          title: payload.title
        });
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },

  }
}
