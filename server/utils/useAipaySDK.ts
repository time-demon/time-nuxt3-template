// 支付宝 Node SDK 配置
import AlipaySdk from "alipay-sdk";
const alipaySdk = new AlipaySdk.default({
  appId: "", // APPID
  signType: "", // 签名类型，一般是RSA2
  gateway: "", // 网关地址
  alipayPublicKey:
    "", // 支付宝公钥
  privateKey:
    "", // 应用私钥
  // 编码字符集
  charset: "utf-8",
  // 版本默认 1.0
  version: "1.0",
});

export default () => {
  return alipaySdk;
};
