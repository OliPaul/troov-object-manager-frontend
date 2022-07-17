<template>
  <b-card>
    <b-card-header>
      <b-img src="https://troov.com/images/troov/logo-dark.png" fluid alt=""></b-img>
      <p>Bienvenue, connectez-vous pour accéder à l'application.</p>
    </b-card-header>
    <b-card-body>
      <Login />
    </b-card-body>
  </b-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Login from "~/pages/authentication/login/index.vue";

export default Vue.extend({
  components: {Login},
  name: 'IndexPage',
  methods: {}
})
</script>
