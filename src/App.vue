<template>
  <div id="app">
    <div v-for="(item, index) in results" :key="index">
        {{item}}
        
    </div>
  </div>
</template>

<script>

import Mail from '@/engine/Mail.js';

export default {
  name: 'App',
  data() {
    return {
      results: [],
      length: 0,
      cookie: "",
      token: "",
    }
  },
  methods: {
    async init() {
      const param = {
        length: this.length,
        cookie: this.cookie,
        token: this.token,
      }
      await Mail.init(param);
    },
    async onFetchMails() {
      const resp = await Mail.fetchMail();
      const items = resp.data.items;
      items.forEach(item => {
        this.results.push(item);
      });
    },
  },
}
</script>

<style>

</style>
