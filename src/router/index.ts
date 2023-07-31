import {createRouter, createWebHistory} from 'vue-router/dist/vue-router';
import mainPage from '@/pages/mainPage.vue';
import todoList from '@/pages/todoList.vue';
import editTask from '@/pages/editTask.vue';
import notFound from '@/pages/notFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home page',
    component: mainPage
  },
  {
    path: '/todo-list',
    name: 'List page',
    component: todoList
  },
  {
    path: '/edit-task/:taskId',
    name: 'Edit task page',
    component: editTask
  },

  // Always last!
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: notFound
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

export default router
