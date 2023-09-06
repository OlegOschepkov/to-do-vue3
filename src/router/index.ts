import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router/dist/vue-router';
import MainPage from '@/views/MainPage.vue';
import TodoList from '@/views/TodoList.vue';
import EditTask from '@/views/EditTask.vue';
import NotFound from '@/views/NotFound.vue';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import { auth } from '@/firebase';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home page',
    component: MainPage
  },
  {
    path: '/todo-list',
    name: 'List page',
    component: TodoList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/edit-task/:taskId',
    name: 'Edit task page',
    component: EditTask,
    meta: {
      requiresAuth: true,
    },
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
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
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

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        unsubscribe();
        resolve(user);
      }, reject);
    }
  )
};

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth && !await getCurrentUser()) {
    next('/profile')
  } else {
    next();
  }
})

export default router;
