/******** Lists ********/
export function addList(state, list) {
  console.log(list);
  state.list_todo_market.splice(state.list_todo_market.length, 0, list);
}
export function deleteList(state, list) {
  let listToReplace = state.list_todo_market.filter(function(obj) {
    return obj.id === list.id;
  })[0];
  let index = state.list_todo_market.indexOf(listToReplace);
  state.list_todo_market.splice(index, 1);
}
export function setList(state, list) {
  let listToReplace = state.list_todo_market.filter(function(obj) {
    return obj.id === list.id;
  })[0];
  let index = state.list_todo_market.indexOf(listToReplace);
  state.list_todo_market.splice(index, 1, list);
}
export function setLoaded(state, payload) {
  state.loaded = payload;
}
export function setIdListSelected(state, payload) {
  state.idListSelected = payload;
}
export function setAllLists(state, allLists) {
  state.list_todo_market = allLists;
}

/****** Items ******/
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
