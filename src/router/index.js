import {createRouter, createWebHistory} from 'vue-router/dist/vue-router';
import mainPage from '@/pages/mainPage';
import todoList from '@/pages/todoList';
import editTask from '@/pages/editTask';

const routes = [
  {
    path: '/',
    component: mainPage
  },
  {
    path: '/todo-list',
    component: todoList
  },
  {
    path: '/edit-task/:taskId',
    component: editTask
  }
]

const router = new createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
