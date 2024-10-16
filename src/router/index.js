import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import Profile from '@/views/Profile.vue';
import Category from '@/views/Category.vue';
import Discussion from '@/components/Discussions/Discussion.vue';
import CreateDiscussion from '@/components/Discussions/CreateDiscussion.vue';
import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/profile', component: Profile },
  { path: '/category/:category', component: Category },
  { path: '/discussion/:id', component: Discussion },
  { path: '/create-discussion', component: CreateDiscussion },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
