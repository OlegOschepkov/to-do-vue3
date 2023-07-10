export const taskModule = {
  namespaced: true,

  state: () => ({
    tasks: [],
    taskId: '',
    selectedSort: '',
    searchQuery: '',
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

    setSelectedSort(state, payload) {
      state.selectedSort = payload
    },

    setSearchQuery(state, payload) {
      state.searchQuery = payload
    },

    addTask(state, payload) {
      state.tasks.push(payload);
      localStorage.setItem("todovue3tasks", JSON.stringify(state));
    },

    setTaskIdToEdit(state, payload) {
      state.taskId = payload.id;
      if (payload.setState) {
        localStorage.setItem("todovue3tasks", JSON.stringify(state));
      }
    },

    editTask(state, payload) {
      const modifiedTaskIndex = [...state.tasks].findIndex(item => item.id === payload.id);
      state.tasks[modifiedTaskIndex] = payload;
      localStorage.setItem("todovue3tasks", JSON.stringify(state));
    },

    deleteTask(state, payload) {
      state.tasks = state.tasks.filter(item => item.id !== payload);
      localStorage.setItem("todovue3tasks", JSON.stringify(state));
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

    taskById(state, getters) {
      return getters.sortedTasks.filter((task) => task.id === state.taskId);
    },

    sortedAndSearchedTasks(state, getters) {
      return getters.sortedTasks.filter((task) => task.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
    },
  },

  actions: {
    // функции вызывающие мутации, сами они не должны менять state
    fetchTasks({commit}) { //  {state, commit, ...}  = context
      try {
        let returnObj;
        if (!localStorage["todovue3tasks"]) {
          localStorage.setItem('todovue3tasks', '');
        } else {
          returnObj = JSON.parse(localStorage.getItem("todovue3tasks"));
          commit('setTasks', returnObj);
        }
        console.log(returnObj);
        console.log(localStorage["todovue3tasks"]);
        if (returnObj && returnObj.taskId ) {
          commit('setTaskIdToEdit', {id: returnObj.taskId, setState: false});
        }
      } catch(e) {
        console.log(e)
      }
    },
  }
}
