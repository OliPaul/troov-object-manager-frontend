<template>
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
</template>

<script>
import createItem from "~/components/AddItem/CreateItem";

export default {
  name: "AddItemComponent",
  data() {
    return {
      itemName: "",
      itemDescription: ""
    }
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const item = await createItem(this, this.itemName, this.itemDescription);
      if(item) {
        this.$root.$emit("itemAdded");
      }

    }
  }
}
</script>

<style scoped>

</style>
