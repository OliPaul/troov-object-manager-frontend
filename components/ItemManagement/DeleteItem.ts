import Vue from "vue";

const deleteItem = async (context: Vue, id: string): Promise<string | undefined> => {
  return await context.$axios.$delete("/item/delete/" + id);
}

export default deleteItem;
