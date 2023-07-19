export const taskModule = {
  namespaced: true,

  state: () => ({
    tasks: [],
    taskId: '',
    selectedSort: '',
    searchQuery: '',
    isLoading: true,
    isError: false,
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
    setTasks(state, payload) {
      if (payload && payload.tasks) {
        state.tasks = payload.tasks;
      }
    },

    setLoading(state, payload) {
      state.isLoading = payload
    },

    setError(state, payload) {
      state.isError = payload
    },

    setSelectedSort(state, payload) {
      state.selectedSort = payload
    },

    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },

    async addTask(state, payload) {
      state.tasks.push(payload);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve()
          }, 1000)
        });
      } catch (e) {
        this.setError( true);
        console.log(e.message)
      }
    },

    async setTaskIdToEdit(state, payload) {
      state.taskId = payload.id;
      if (payload.setState) {
        try {
          await new Promise((resolve) => {
            setTimeout(() => {
              localStorage.setItem("todovue3tasks", JSON.stringify(state));
              resolve()
            }, 1000)
          });
        } catch (e) {
          this.setError( true);
          console.log(e.message)
        }
      }
    },

    async editTask(state, payload) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve()
          }, 1000)
        });
      } catch (e) {
        this.setError( true);
        console.log(e.message)
      }
    },

    async deleteTask(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload);
      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            localStorage.setItem("todovue3tasks", JSON.stringify(state));
            resolve()
          }, 1000)
        });
      } catch (e) {
        this.setError( true);
        console.log(e.message)
      }
    },
  },

  getters: {
    // computed свойства, кешируемые, вычисляемые значение
    sortedTasks(state) {
      return [...state.tasks].sort((task1, task2) => {
        if (typeof task1[state.selectedSort] === 'number') {
          return task1[state.selectedSort] - task2[state.selectedSort]
        } else {
          return task1[state.selectedSort]?.localeCompare(task2[state.selectedSort])
        }
      })
    },

    taskById(state) {
      return [...state.tasks].filter((task) => task.id === state.taskId)[0];
    },

    sortedAndSearchedTasks(state, getters) {
      return getters.sortedTasks.filter((task) => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
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
            }
            if (returnObj && returnObj.taskId ) {
              commit('setTaskIdToEdit', {id: returnObj.taskId, setState: false});
            }
            resolve()
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
