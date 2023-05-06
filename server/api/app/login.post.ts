export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);
  console.log("query", query);
  // 定义必须的参数
  //   const queryKey = ["account", "password"];
  //   for (let i in queryKey) {
  //     if (!query[queryKey[i]]) {
  //       return {
  //         code: -1,
  //         msg: "参数不足",
  //       };
  //     }
  //   }
  console.log('权限撒大苏打');
  

  let returnData = {} as any;
  if (query.type === "wx") {
    console.log('权限撒大苏打2');
    try {
      // 从微信获取用户凭证
      let wxConfig = (await useDbQuery({
        query: { type: "wx" },
        table: "config",
      })) as any;

      const appid = wxConfig.data[0].appid;
      const secret = wxConfig.data[0].secret;
      const userReturn = await (() => {
        return new Promise((resolve, reject) => {
          useAxios({
            url: wxConfig.data[0].authentication.url,
            params: {
              appid: appid,
              secret: secret,
              js_code: query.code,
              grant_type: wxConfig.data[0].authentication.grant_type,
            },
          }).then((r) => {
            resolve(r);
          });
        });
      })();
      // 查询是否有该用户

      await useDbQuery({
        query: { unionid: userReturn.unionid },
        table: "user",
      })
        .then(async (r: any) => {
          // 用户不存在，添加用户
          if (!r.data.length) {
            try {
              console.log(4);
              let usersNum = await useDbQuery({
                query: {},
                type: "count",
                table: "user",
              });
              const time = new Date().getTime();
              const db_add_return = await useDbAdd({
                data: [
                  Object.assign(userReturn, {
                    count: 20,
                    name: `微信用户_${usersNum + 1}`,
                    time: time,
                    time_last: time,
                    ip: getHeaders(event)["x-forwarded-for"],
                  }),
                ],
                table: "user",
              });
              let userInfoData = await useDbQuery({
                query: { _id: db_add_return.insertedIds[0] },
                table: "user",
              });
              returnData.data = userInfoData.data[0];
              returnData.code = 200;
            } catch (err) {
              returnData.err1 = JSON.stringify(err);
              returnData.code = -1;
              try {
                useSaveError(err);
              } catch {}
            }
            return;
          } else {
            // 如果用户存在，更新用户信息
            const time = new Date().getTime();
            await useDbSet({
              where: { _id: r.data[0]._id },
              set: {
                $set: {
                  time_last: time,
                  ip: getHeaders(event)["x-forwarded-for"],
                },
              },
              table: "user",
            });
            

            returnData.data = r.data[0];
            returnData.code = 200;
          }
        })
        .catch((err) => {
          returnData.err = JSON.stringify(err);
          returnData.code = -1;
          try {
            useSaveError(err);
          } catch {}
        });
    } catch (err) {
      returnData.err = JSON.stringify(err);
      returnData.code = -1;
      try {
        useSaveError(err);
      } catch {}
    }
  }

  return returnData;
});
