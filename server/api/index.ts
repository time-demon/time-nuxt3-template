export default defineEventHandler(async (event: any) => {
  const returnData = {} as any;
  // 等待需要结合 async/await 和 Promise
  // 等待上面的函数运行完毕后就会抛出 returnData
  return returnData;
});
