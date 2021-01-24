export function formatDateTime() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  let date = now.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  /* let week = now.getDay()
    switch (week) {
      case 0:
        week = '星期日'
        break
      case 1:
        week = '星期一'
        break
      case 2:
        week = '星期二'
        break
      case 3:
        week = '星期三'
        break
      case 4:
        week = '星期四'
        break
      case 5:
        week = '星期五'
        break
      case 6:
        week = '星期六'
        break

      default:
        week = ''
        break
    } */
  let hour = now.getHours();
  if (hour < 10) {
    hour = '0' + hour;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = '0' + minute;
  }
  let second = now.getSeconds();
  if (second < 10) {
    second = '0' + second;
  }
  let result = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;
  return result;
}
