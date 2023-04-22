// 数据修改
import { MongoClient, ObjectId } from "mongodb";
import url from "~/server/mongodb";

export default defineEventHandler(async (event: any) => {
  const body = await readBody(event);
  let returnData = {} as any;

  console.log(662, body.method, body.url, body.data, 662);
  await useAxios({
    method: body.method,
    url: body.url,
    data: body.data,
  })
    .then((r: any) => {
      console.log(666);
      returnData = r;
    })
    .catch((err: any) => {
      returnData = err;
    });

  //   await setData({ body })
  //     .then((r: any) => {
  //       returnData = {
  //         code: 200,
  //         msg: "成功",
  //       };
  //     })
  //     .catch((err: any) => {
  //       returnData = err;
  //     });

  return returnData;
});

// 设置数据
async function setData({ body }: any) {
  return new Promise((resolve, reject) => {});
}
