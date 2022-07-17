<template>
  <b-card>
    <b-card-header>
      <b-img src="https://troov.com/images/troov/logo-dark.png" fluid alt=""></b-img>
      <h3>Bienvenue {{ userName }},</h3>
      <p>Gérez de façon efficace vos objets</p>
    </b-card-header>
    <b-card-body>
      <b-row class="justify-content-md-center" align-v="center" align-h="between">
        <b-col md="4"></b-col>
        <b-col md="8">
          <b-table striped hover :items="items"></b-table>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import getItemList from "~/pages/item/GetItemList";

export default {
  name: "Item",
  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      await this.$router.push("/");
    }
    this.items = await getItemList(this);
  },
  data() {
    return {
      userName: this.$route.query.name,
      itemName: "",
      itemDescription: "",
      items: []
    };
  },
  methods: {

  }
}
</script>

<style scoped>

</style>
