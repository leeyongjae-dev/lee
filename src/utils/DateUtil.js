// 날짜 형식 포맷팅
export const dateFormat = (basDate, delimiter) => {
  const baDate = new Date(basDate);

  let year = baDate.getFullYear().toString();
  let basMonth = baDate.getMonth() + 1;
  let month = basMonth >= 10 ? basMonth.toString() : '0' + basMonth.toString();
  let day =
    baDate.getDate() >= 10
      ? baDate.getDate().toString()
      : '0' + baDate.getDate().toString();

  const reDate = year + delimiter + month + delimiter + day;

  return reDate;
};