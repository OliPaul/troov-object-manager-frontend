import Vue from "vue";
import Item from "~/models/Item";

const createItem = async (context: Vue, name: string, description: string): Promise<Item | undefined> => {
  if (name == "") {
    alert("Veuillez saisir le nom de l'objet svp");
    return;
  }

  if (description == "") {
    alert("Veuillez donner une description à votre objet");
    return;
  }

  const itemInfo = await context.$axios.$post("/item/store", {name: name, description: description})
  return new Item(itemInfo.id, itemInfo.name, itemInfo.description);
}

export default createItem;
