export function getAllItems(state) {
  return state.items;
}
export function getAllUncheckedItems(state) {
  return state.items.filter(item => item.isCheck == false);
}
