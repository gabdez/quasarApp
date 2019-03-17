export function getAllLists(state) {
  return state.list_todo_market;
}
export function getList(state) {
  return function(id_list) {
    if (id_list) return state.list_todo_market.filter(list => list.id == id_list)[0];
    else return state.list_todo_market[0];
  };
}
export function getAllItems(state) {
  return function(id_list) {
    return state.list_todo_market.filter(list => list.id == id_list)[0].items;
  };
}
export function getAllUncheckedItems(state, getters) {
  return function(id_list) {
    return getters.getAllItems(id_list).filter(item => item.isCheck == false);
  };
}
export function getDate(state) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;
  return today;
}
