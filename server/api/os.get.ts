// OS获取
import os from "os";
export default defineEventHandler(async (event: any) => {

  const OS = {
    node: `${process.release.name} ${process.version}`, // node
    type: os.type(), // 操作系统名称
    platform: os.platform(), // 操作系统平台标识
    cpus: os.cpus(), // 每个逻辑 CPU 内核的信息的对象数组
    totalmem: os.totalmem(), // 系统内存总量
    freemem: os.freemem(), // 可用系统内存量
    time: os.uptime(), // 系统运行时间
    version: os.version(), // 内核版本标识
    arch: os.arch(), //  CPU 体系结构
    machine: os.machine(), // 计算机类型
  };
  let returnData = {} as any;
  returnData.data = OS;
  returnData.code = 200;
  return returnData;
});
