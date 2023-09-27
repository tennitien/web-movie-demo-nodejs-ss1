// Divide the data into many different pages
//  each page contains the number of page
exports.getPageFromPagination = (arr, sizePagination, pageSelect) => {
  let result = [];
  let arrCopy = [...arr];
  while (arrCopy.length) {
    result.push(arrCopy.splice(0, sizePagination));
  }
  return result[pageSelect - 1];
};
