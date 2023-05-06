// 验证订单支付状态
// AlipayFormData
import AlipayFormData from "alipay-sdk/lib/form.js";

export default defineEventHandler(async (event: any) => {
  // 获取参数
  const query = await readBody(event);

  let returnData = {} as any;

  const formData = new AlipayFormData.default();
  formData.setMethod("get");
  // 参数一般推荐 trade_no ，不推荐 out_trade_no，但发起订单支付的时候验证支付状态请使用 out_trade_no
  const bizContent = {
    trade_no: query.trade_no, // 订单交易号
    out_trade_no: query.out_trade_no, // 商户订单号
  };
  formData.addField("bizContent", bizContent);
  try {
    // 获取订单支付信息检测地址
    const orderInfoUrl = (await useAipaySDK().exec(
      "alipay.trade.query", // 接口名称
      {},
      { formData: formData }
    )) as any;
    // 获取订单支付信息
    const orderInfoReturn = (await useAxios({
      url: orderInfoUrl,
    })) as any;
    returnData.code = 200;
    console.log(orderInfoReturn, "orderInfoReturn");

    // 进行订单支付状态检测
    returnData.type = orderInfoReturn.alipay_trade_query_response.trade_status;
    switch (orderInfoReturn.alipay_trade_query_response.trade_status) {
      case "WAIT_BUYER_PAY":
        returnData.msg = "等待买家付款";
        break;
      case "TRADE_CLOSED":
        returnData.msg = "订单超时关闭";
        break;
      case "TRADE_SUCCESS":
        returnData.msg = "订单支付成功";
        break;
      case "TRADE_FINISHED":
        returnData.msg = "订单交易结束，不可退款";
        break;
      default:
        returnData.msg = "等待买家扫码或订单不存在";
        break;
    }
  } catch (err) {
    // 失败
    returnData.msg = err;
    returnData.code = 500;
  }

  return returnData;
});
