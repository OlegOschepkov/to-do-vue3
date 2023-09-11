import { Task } from '@/types/task';
import TasksState from '@/types/tasksState';
import { db } from '@/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, onSnapshot, updateDoc, query, where, or } from 'firebase/firestore';
import router from '@/router';
import { defaultSortOptions } from '@/types/sortOptions';

const stateCollectionRef = collection(db, "State");

export const taskModule = {
  namespaced: true,

  state: (): TasksState => ({
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
    setTasks(state: TasksState, payload: TasksState) {
      if (payload && payload.tasks) {
        state.tasks = payload.tasks;
      }
    },

    setLoading(state: TasksState, payload: boolean) {
      if (payload) {
        state.isLoading = payload
      } else {
        setTimeout(() => state.isLoading = payload, 300) // Убираю мигание при быстром ответе от сервера
      }
    },

    setError(state: TasksState, payload: boolean) {
      state.isError = payload
    },

    setSelectedSort(state: TasksState, payload: string) {
      state.selectedSort = payload
    },

    setSearchQuery(state: TasksState, payload: string) {
      state.searchQuery = payload
    },

    setRouteState(state: TasksState) {
      state.isRouted = true
    },

    setTaskIdToEdit (state: TasksState, payload: string) {
      state.taskId = payload
    },

    setNewTaskToState(state: TasksState, payload: Task) {
      state.tasks.push(payload);
    },

    setModifiedTaskInState(state: TasksState, payload: Task) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
    },

    setDeleteTaskFromState(state: TasksState, payload: Task) {
      state.tasks = state.tasks.filter(item => item.id !== payload.id);
    },
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    getSortedTasks(state: TasksState): Task[] {
      return [...state.tasks].sort((task1: Task, task2: Task) => {
        if (task1[state.selectedSort] instanceof Date || typeof task1[state.selectedSort] === 'number') {
          return task1[state.selectedSort] - task2[state.selectedSort]
        } else {
          return task1[state.selectedSort]?.localeCompare(task2[state.selectedSort])
        }
      })
    },

    getRouteState (state: TasksState): boolean {
      return state.isRouted;
    },

    getTaskById(state: TasksState): Task {
      return [...state.tasks].filter((task) => task.id === state.taskId)[0];
    },

    getSortedAndSearchedActiveTasks(state: TasksState, getters): Task[] {
      return getters.getSortedTasks.filter(item => item.completed === false).filter(task => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },

    getSortedAndSearchedCompletedTasks(state: TasksState, getters): Task[] {
      return getters.getSortedTasks.filter(item => item.completed === true).filter((task) => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },
  },

  actions: {
    // функции вызывающие мутации, сами они не должны менять state
    async fetchTasks({ commit, dispatch, rootState }) { //  {state, commit, ...}  = context
      try {
        const queryRef = query(
          stateCollectionRef,
          or(
            where("author.uid", "==", rootState.authModule.user?.data?.uid ),
            where("access", "==", 'all')
          )
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
            author: doc.data().author,
            access: doc.data().access
          }
          tempObjForTasks.tasks.push(tempTask);
        });

        commit('setTasks', tempObjForTasks);
        commit('setRouteState');
        dispatch('startListener');
        commit('setLoading', false);
      } catch (e) {
        commit('setError', true);
        console.log(e.message)
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
            completedAt: change.doc.data().completedAt?.toDate(),
            author: change.doc.data().author,
            access: change.doc.data().access
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

    async addTask({ commit, rootState }, payload: Task) {
      try {
        commit('setLoading', true);
        await addDoc(stateCollectionRef, {
          title: payload.title,
          date: payload.date,
          importance: payload.importance,
          completed: payload.completed,
          author: {
            uid: rootState.authModule.user?.data?.uid,
            displayName: rootState.authModule.user?.data?.displayName
          },
          access: payload.access
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
          completed: payload.completed,
          access: payload.access
        });
        commit('setLoading', false);
        await router.push('/todo-list');
      } catch (e) {
        commit('setError', true);
        console.log(e.message);
      }
    },
  }
}
