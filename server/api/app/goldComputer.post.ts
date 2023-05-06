export default defineEventHandler(async (event: any) => {
  const query = await readBody(event);
  console.log("query", query);

  // 定义必须的参数
  const queryKey = ["countType", "count", "_id", "taskType"];
  if (!query) {
    return {
      code: -1,
      msg: "参数不足",
    };
  }
  for (let i in queryKey) {
    if (!query[queryKey[i]]) {
      return {
        code: -1,
        msg: "参数不足",
      };
    }
  }

  let returnData = {} as any;

  try {
    // 获取用户信息
    let user = await useDbQuery({
      query: { _id: query._id },
      table: "user",
    });
    // 如果没用该用户
    if (user.data.length === 0) {
      returnData.code = -100;
      returnData.msg = "用户不存在";
      return returnData;
    }
    // 定义一个任务数组
    const userTask = [];
    // 检测该用户数据中是否有任务key
    // 如果有
    if (user.data[0].task && user.data[0].task instanceof Array) {
      for (let i in user.data[0].task) {
        userTask[i] = user.data[0].task[i];
      }
    }
    // 检测当是否有该任务type
    const taskTypeList = userTask.filter(
      (item) => item.type === query.taskType
    );
    if (taskTypeList.length) {
      // 检测当前任务type是否是当天已完成任务
      const taskTypeListTime = taskTypeList.filter(
        (item) =>
          new Date(item.time).toDateString() === new Date().toDateString()
      );
      console.log(taskTypeListTime, "taskTypeListTime");
      if (!taskTypeListTime.length) {
        userTask.push({
          type: query.taskType,
          time: new Date().getTime(),
        });
      }
    } else {
      userTask.push({
        type: query.taskType,
        time: new Date().getTime(),
      });
    }

    let countCopmputer = user.data[0].count;

    switch (query.countType) {
      case "add":
        countCopmputer += query.count;
        break;
      case "reduce":
        countCopmputer -= query.count;
        break;

      default:
        break;
    }

    await useDbSet({
      where: { _id: user.data[0]._id },
      set: { $set: { count: countCopmputer, task: userTask } },
      table: "user",
    });
    returnData.code = 200;
  } catch (err) {
    console.log("err", err);

    returnData.code = -1;
  }

  return returnData;
});
