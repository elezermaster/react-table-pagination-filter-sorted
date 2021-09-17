import lodash from "lodash";
//paginate(users, activePage, pageSize)
export function paginate(items, pageNumber, pageSize) {
  //начальный индех элемента
  const startIndex = (pageNumber - 1) * pageSize;
  //отрежет массив начиная со startIndex
  //lodash.slice(items,startIndex)
  //количество элементов которые берем с этого массива pageSize
  //lodash.take(lodash.slice(items, startIndex), pageSize)
  return lodash(items).slice(startIndex).take(pageSize).value();
}
