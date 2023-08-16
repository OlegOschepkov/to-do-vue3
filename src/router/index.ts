import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router/dist/vue-router';
import mainPage from '@/views/MainPage.vue';
import todoList from '@/views/TodoList.vue';
import editTask from '@/views/EditTask.vue';
import notFound from '@/views/NotFound.vue';

const routes: Array<RouteRecordRaw> = [
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
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;
