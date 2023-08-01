import Task from '@/types/task';
import State from '@/types/state';
import TaskIdToEdit from '@/types/taskIdToEdit';

export const taskModule = {
  namespaced: true,

  state: (): State => ({
    tasks: [],
    taskId: null,
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

    async addTask(state: State, payload: Task) {
      state.tasks.push(payload);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve(1)
          }, 1000)
        });
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },

    async setTaskIdToEdit(state: State, payload: TaskIdToEdit) {
      state.taskId = payload.id;
      if (payload.setState) {
        try {
          await new Promise((resolve) => {
            setTimeout(() => {
              localStorage.setItem("todovue3tasks", JSON.stringify(state));
              resolve(1)
            }, 1000)
          });
        } catch (e) {
          this.setError(state, true);
          console.log(e.message)
        }
      }
    },

    async editTask(state: State, payload: Task) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve(1)
          }, 1000)
        });
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },

    async deleteTask(state: State, payload: number) {
      state.tasks = state.tasks.filter(item => item.id !== payload);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve(1)
          }, 1000)
        });
      } catch (e) {
        this.setError(state, true);
        console.log(e.message)
      }
    },
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    getSortedTasks(state: State): Task[] {
      return [...state.tasks].sort((task1: Task, task2: Task) => {
        console.log(state.selectedSort)
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
    async fetchTasks({commit}) { //  {state, commit, ...}  = context
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            let returnObj;
            if (!localStorage["todovue3tasks"]) {
              localStorage.setItem('todovue3tasks', '');
            } else {
              returnObj = JSON.parse(localStorage.getItem("todovue3tasks"));
              commit('setTasks', returnObj);
              commit('setRouteState');
            }
            if (returnObj && returnObj.taskId ) {
              commit('setTaskIdToEdit', {id: returnObj.taskId, setState: false} as TaskIdToEdit);
            }
            resolve(1)
          }, 1000)
        });
      } catch (e) {
        commit('setError', true);
        console.log(e.message)
      } finally {
        commit('setLoading', false);
      }
    },
  }
}
