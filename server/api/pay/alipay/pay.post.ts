// 发起订单支付
// 需传入
// AlipayFormData
import AlipayFormData from "alipay-sdk/lib/form.js";

export default defineEventHandler(async (event: any) => {
  // 获取参数
  const query = await readBody(event);
  console.log(query, "query");

  let returnData = {} as any;

  const formData = new AlipayFormData.default();
  formData.setMethod("get");
  formData.addField("return_url", "https://timebk.cn/"); // 支付完成后打开的地址
  // 需要的参数，更多参数请自行阅读：https://opendocs.alipay.com/open/028r8t?scene=22&pathHash=8e24911d
  const orderNo = getOrderNo();
  const bizContent = {
    out_trade_no: orderNo, // 商户订单号
    total_amount: "1", // 订单总金额
    subject: "测试标题", // 订单标题
    body: "测试附加信息", // 订单附加信息
    product_code: "FACE_TO_FACE_PAYMENT", // 产品码
  };
  formData.addField("bizContent", bizContent);

  // 获取支付地址
  try {
    // const result = await useAipaySDK().exec(
    //   "alipay.trade.page.pay", // 接口名称，例如电脑网站支付的接口名称：alipay.trade.create
    //   {},
    //   { formData: formData }
    // );
    const result = await useAipaySDK().exec(
      "alipay.trade.precreate", // 接口名称，例如电脑网站支付的接口名称：alipay.trade.create
      {},
      { formData: formData }
    );
    await (() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          returnData.payUrl = result;
          returnData.orderNo = orderNo;
          returnData.code = 200;
          resolve(true);
        }, 300);
      });
    })();
  } catch (err) {
    // 获取支付地址失败
    console.log("err", err);

    returnData.msg = err;
    returnData.code = -1;
  }

  return returnData;
});
