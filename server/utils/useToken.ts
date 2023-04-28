// token生成和验证 同步的方式
// 生成token => type：sign；data：生成时需要转换的数据；key：公钥或私钥(默认:defalutKey)；time:有效时间(默认:1天)
// 验证token => type：不为sign即可；token：需要验证的token；key：公钥或私钥(默认:defalutKey)
import jwt from "jsonwebtoken";

const useToken = ({
  type,
  data,
  token,
  key = "defalutKey",
  time = "1d",
}: any) => {

  // 生成token
  if (type === "sign") {

    const tokenNew = jwt.sign(data, key, { expiresIn: time });
    return tokenNew;
  } else {
    // 验证token
    // 如果有认证头
    if (/bearer/gi.test(token) || token.split(" ").length !== 1) {
      token = token.split(" ")[1];
    }

    const tokenVerify = jwt.verify(token, key, (err: any, data: any) => {
      // 如果抛出错误
      if (err) {
        switch (err.message) {
          case "jwt malformed":
            console.log("不合法");
            return false;
            break;
          case "invalid signature":
            console.log("密钥错误");
            return false;
            break;
          case "invalid token":
            console.log("无效");
            return false;
            break;
          case "jwt expired":
            console.log("失效");
            return false;
            break;
          default:
            console.log("异常");
            return false;
            break;
        }
      } else {
        return true;
      }
    });

    return tokenVerify;
  }
};

export default useToken;
