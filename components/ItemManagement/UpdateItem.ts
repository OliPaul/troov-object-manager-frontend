import Vue from "vue";
import Item from "~/models/Item";

const updateItem = async (context: Vue, id: string, name: string, description: string): Promise<Item | undefined> => {
  if (name == "") {
    alert("Un nom pour l'objet est requis");
    return;
  }

  if (description == "") {
    alert("Une description de l'objet est requise");
    return;
  }

  const itemInfo = await context.$axios.$put("/item/update/" + id, {name: name, description: description})
  return new Item(itemInfo.id, itemInfo.name, itemInfo.description);
}

export default updateItem;
