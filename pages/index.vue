<template>
  <Login/>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from "~/pages/authentication/login/index.vue";

export default Vue.extend({
  components: {Login},
  name: 'IndexPage',
})
</script>
