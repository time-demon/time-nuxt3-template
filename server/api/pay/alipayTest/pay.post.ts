// 发起订单支付，当面付
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
    total_amount: query.payCount, // 订单总金额
    subject: "仅供测试：" + query.payGoodsName, // 订单标题
    body: "仅供测试，请勿用于违法！", // 订单附加信息
    product_code: "FACE_TO_FACE_PAYMENT", // 产品码
  };
  formData.addField("bizContent", bizContent);

  // 获取支付地址
  try {
    const result = await useAipaySDK().exec(
      "alipay.trade.precreate", // 接口名称，例如电脑网站支付的接口名称：alipay.trade.create
      {},
      { formData: formData }
    );
    // 获取qrcode
    try {
      const qrcodeReturn = (await useAxios({
        url: result,
      })) as any;
      // 检查是否获取成功
      if (
        qrcodeReturn.alipay_trade_precreate_response.code == 10000 &&
        qrcodeReturn.alipay_trade_precreate_response.msg === "Success"
      ) {
        returnData.payUrl =
          qrcodeReturn.alipay_trade_precreate_response.qr_code;
        returnData.orderNo =
          qrcodeReturn.alipay_trade_precreate_response.out_trade_no;
        returnData.orderNo2 = orderNo;
        returnData.code = 200;
      } else {
        returnData.msg = "获取qrcode失败";
        returnData.code = -1;
      }
    } catch (err) {
      returnData.msg = err;
      returnData.code = -1;
    }
  } catch (err) {
    // 获取支付地址失败
    console.log("err", err);

    returnData.msg = err;
    returnData.code = -1;
  }

  return returnData;
});
