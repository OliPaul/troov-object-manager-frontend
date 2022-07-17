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
          <b-table striped hover :items="items" :fields="fields">
            <template #cell(actions)="row">
              <b-button size="sm" @click="showUpdateModal(row.item, row.index, $event.target)" class="mr-1">
                Modifier
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-card-body>
    <b-modal :id="infoModal.id" :title="infoModal.title" hide-footer>
      <b-form @submit="onUpdate($event, )">
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
  </b-card>
</template>

<script>
import getItemList from "~/pages/item/GetItemList";
import createItem from "~/pages/item/CreateItem";
import updateItem from "~/pages/item/UpdateItem";

export default {
  name: "Item",
  async mounted() {
    const token = localStorage.getItem("token");
    if (!token) {
      await this.$router.push("/");
    }
    await this.getItems();
  },
  data() {
    return {
      userName: this.$route.query.name,
      itemName: "",
      itemDescription: "",
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
    };
  },
  methods: {
    async getItems() {
      this.items = await getItemList(this);
    },
    async onSubmit(event) {
      event.preventDefault();
      const item = await createItem(this, this.itemName, this.itemDescription);
      this.items.push(item);
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
  }
}
</script>

<style scoped>

</style>
