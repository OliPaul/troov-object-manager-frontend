import Vue from "vue";
import Item from "~/models/Item";

const getItemList = async (context: Vue): Promise<Item[] | undefined> => {
  const itemsResponse = await context.$axios.get("/item");
  const items = itemsResponse.data;
  return items.map((item: any) => new Item(item.id, item.name, item.description));
}

export default getItemList;
