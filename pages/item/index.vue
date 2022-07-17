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
          <b-card>
            <b-form @submit="onSubmit">
              <h4>Ajouter un nouvel objet</h4>
              <b-form-group>
                <b-form-input
                  id="input-1"
                  v-model="itemName"
                  type="text"
                  placeholder="nom de l'objet"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-form-textarea
                  id="input-2"
                  rows="5"
                  max-rows="5"
                  v-model="itemDescription"
                  placeholder="description de l'objet"
                  required
                ></b-form-textarea>
              </b-form-group>

              <b-button block type="submit" variant="primary">Valider</b-button>
            </b-form>
          </b-card>
        </b-col>
        <b-col md="8">
          <b-table striped hover :items="items"></b-table>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import getItemList from "~/pages/item/GetItemList";
import createItem from "~/pages/item/CreateItem";

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
    async onSubmit(event) {
      event.preventDefault();
      const item = await createItem(this, this.itemName, this.itemDescription);
      this.items.push(item);
    }
  }
}
</script>

<style scoped>

</style>
