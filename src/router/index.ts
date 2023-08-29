import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router/dist/vue-router';
import MainPage from '@/views/MainPage.vue';
import TodoList from '@/views/TodoList.vue';
import EditTask from '@/views/EditTask.vue';
import NotFound from '@/views/NotFound.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home page',
    component: MainPage
  },
  {
    path: '/todo-list',
    name: 'List page',
    component: TodoList
  },
  {
    path: '/edit-task/:taskId',
    name: 'Edit task page',
    component: EditTask
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterPage
  },

  // Always last!
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
});

export default router;
