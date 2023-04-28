// api测试
export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  let returnData = {} as any;

  await useAxios({
    method: body.method,
    url: body.url,
    data: body.data,
  })
    .then((r: any) => {
      returnData = r;
    })
    .catch((err: any) => {
      returnData = err;
      try {
        useSaveError(err);
      } catch {}
    });

  return returnData;
});

// 设置数据
function setData({ body }: any) {
  return new Promise((resolve, reject) => {});
}
