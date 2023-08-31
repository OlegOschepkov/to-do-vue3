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
    meta: {
      requiresAuth: true,
    },
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

// router.beforeEach((to, from, next) => {
//   const user = auth.currentUser;
//
//   console.log(user)
//
//   if (!user && from.path !== '/login') {
//     next('/login')
//   } else {
//     next()
//   }
// });


router.beforeEach((to, from) => {
  const user = auth.currentUser;

  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  console.log(user)
  if (to.meta.requiresAuth && !user) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      path: '/login',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
})

export default router;
