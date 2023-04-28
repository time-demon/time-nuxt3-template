export default defineEventHandler(async (event: any) => {
  const query = getQuery(event);
  let returnData = {} as any;

  if (JSON.stringify(query) === "{}") {
    returnData.code = -1;
    return returnData;
  }
  try {
    let useDbQuery_return = (await useDbQuery({
      query: query,
      table: "config",
    })) as any;
    if (!useDbQuery_return.data.length) {
      returnData = { code: -1, msg: "参数不合法" };
      return;
    }
    useDbQuery_return.data = useDbQuery_return.data[0];
    returnData = useDbQuery_return;
    returnData.code = 200;
  } catch (err) {
    returnData.code = -1;
    try {
      useSaveError(err);
    } catch {}
  }

  await useDbQuery({ query: query, table: "config" })
    .then((r: any) => {
      console.log(7);
      if (!r.data.length) {
        returnData = { code: -1, msg: "参数不合法" };
        return;
      }
      r.data = r.data[0];
      returnData = r;
      returnData.code = 200;
    })
    .catch((err) => {
      returnData.code = -1;
      try {
        useSaveError(err);
      } catch {}
    });
  return returnData;
});
