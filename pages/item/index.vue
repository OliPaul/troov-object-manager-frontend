<template>
  <b-card>
    <b-card-header>
      <b-img src="https://troov.com/images/troov/logo-dark.png" fluid alt=""></b-img>
      <h3>Bienvenue {{ userName }},</h3>
      <p>Gérez de façon efficace vos objets</p>
    </b-card-header>
    <b-card-body>
      <b-row class="justify-content-md-center" align-v="start" align-h="between">
        <b-col md="3">
          <AddItemComponent />
        </b-col>
        <b-col md="8">
          <ItemManagementComponent />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import ItemManagementComponent from "~/components/ItemManagement/ItemManagementComponent";
import AddItemComponent from "~/components/AddItem/AddItemComponent";

export default {
  name: "Item",
  components: {AddItemComponent, ItemManagementComponent},
  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      await this.$router.push("/");
    }
  },
  data() {
    return {
      userName: this.$route.query.name,
    };
  },
}
</script>

<style scoped>

</style>
