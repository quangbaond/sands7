<script setup>
import axios from '@/common/axios';
import { useStore } from 'vuex';

const store = useStore();
axios.get('/cskh').then(res => {
  store.commit('setCskh', res);
});

axios.get('/me/profile').then(res => {
  store.commit('setProfile', res?.user);
})
</script>

<template>
  <router-view />
</template>
