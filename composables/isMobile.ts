//  检测是否为移动端
export default (type = "" as string) => {
  if (process.client) {
    return /mobile/gi.test(navigator.userAgent);
  }
  return false;
};
