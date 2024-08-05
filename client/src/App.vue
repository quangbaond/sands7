<script setup>
import axios from '@/common/axios';
import { useStore } from 'vuex';

const store = useStore();
axios.get('/cskh').then(res => {
  store.commit('setCskh', res);
});

</script>

<template>
  <router-view />
</template>
