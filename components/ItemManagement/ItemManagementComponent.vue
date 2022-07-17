<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(actions)="row">
        <b-button size="sm" @click="showUpdateModal(row.item, row.index, $event.target)" class="mr-1">
          Modifier
        </b-button>
        <b-button size="sm" variant="danger" @click="onDelete(row.item, row.index, $event.target)" class="mr-1">
          Supprimer
        </b-button>
      </template>
    </b-table>
    <b-modal :id="infoModal.id" :title="infoModal.title" hide-footer>
      <b-form @submit="onUpdate">
        <b-form-group>
          <b-form-input
            id="input-1"
            v-model="infoModal.form.itemName"
            type="text"
            placeholder="nom de l'objet"
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-textarea
            id="input-2"
            rows="5"
            max-rows="5"
            v-model="infoModal.form.itemDescription"
            placeholder="description de l'objet"
          ></b-form-textarea>
        </b-form-group>

        <b-button block type="submit" variant="primary">Mettre à jour</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import getItemList from "~/components/ItemManagement/GetItemList";
import updateItem from "~/components/ItemManagement/UpdateItem";
import deleteItem from "~/components/ItemManagement/DeleteItem";

export default {
  name: "ItemManagementComponent",
  async mounted() {
    await this.getItems();
  },
  data() {
    return {
      items: [],
      fields: [
        {key: 'id', label: 'Identifiant'},
        {key: 'name', label: "Nom de l'objet"},
        {key: 'description', label: "Description de l'objet"},
        {key: 'actions', label: 'Actions'}
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        form: {
          itemId: "",
          itemName: "",
          itemDescription: ""
        }
      }
    }
  },
  created() {
    this.$root.$once("itemAdded", () => this.getItems())
  },
  methods: {
    async getItems() {
      this.items = await getItemList(this);
    },
    showUpdateModal(item, _index, button) {
      this.infoModal.title = `Modifier ${item.name} (${item.id})`;
      this.infoModal.form.itemId = item.id;
      this.infoModal.form.itemName = item.name;
      this.infoModal.form.itemDescription = item.description;
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    async onUpdate(event) {
      event.preventDefault();
      const item = await updateItem(this,
        this.infoModal.form.itemId,
        this.infoModal.form.itemName,
        this.infoModal.form.itemDescription);
      if (item) {
        await this.getItems();
        this.$root.$emit('bv::hide::modal', this.infoModal.id);
      }
    },
    async onDelete(item, _index, _button) {
      const itemId = await deleteItem(this, item.id);
      if (itemId) {
        await this.getItems();
      }
    }
  }
}
</script>

<style scoped>

</style>
