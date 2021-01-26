/* 用逗号分隔数字 比如 1234.345 ==> 1,234.345 */
export function separateWithComma(str) {
  if (!str) return '';
  str = str.toString();
  const numList = str.split('.');
  const intPart = numList[0];
  const floatPart = numList[1];
  if (intPart) {
    const result = intPart
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      });
    if (floatPart) {
      return result + '.' + floatPart;
    }
    return result;
  }
  return '';
}
