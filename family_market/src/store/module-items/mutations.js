export function addItem(state, nameItem) {
  state.items.splice(state.items.length, 0, { id: state.counter++, name: nameItem, isCheck: false });
}
export function deleteItem(state, item) {
  let index = state.items.indexOf(item);
  state.items.splice(index, 1);
}
export function deleteAll(state) {
  state.items.length = 0;
  state.items.splice(0, state.items.length);
}
export function clearCompleted(state) {
  state.items = state.items.filter(item => item.isCheck == false);
}
