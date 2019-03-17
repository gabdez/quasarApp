export function addList(state, list) {
  state.list_todo_market.splice(state.list_todo_market.length, 0, list);
}
export function setAllLists(state, allLists) {
  state.list_todo_market = allLists;
}
export function deleteList(state, list) {
  let index = state.list_todo_market.indexOf(list);
  state.list_todo_market.splice(index, 1);
}

export function addItem(state, { newItem, list }) {
  list.items.splice(list.items.length, 0, { id: list.counter++, name: newItem, isCheck: false });
}
export function deleteItem(state, { item, list }) {
  let index = list.items.indexOf(item);
  list.items.splice(index, 1);
}
export function deleteAll(state, list) {
  list.items.length = 0;
  list.items.splice(0, list.items.length);
}
export function clearCompleted(state, list) {
  list.items = list.items.filter(item => item.isCheck == false);
}
