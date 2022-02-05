import { JSEncrypt } from "jsencrypt";

// encrypt는 암호화 하는 과정입니다.
export const encrypt = function (data) {
  let encryptor = new JSEncrypt(); 
  let publicKey = process.env.VUE_APP_PUBLIC_KEY.replace(/\\n/g, "\n");

  console.log("encrypt plainText : " + data + ", publicKey : " + publicKey);
  encryptor.setPublicKey(publicKey);

  let result = encryptor.encrypt(data);

  console.log("encrypt result : " + result);
  return result;
};

// decrypt는 복호화 하는 과정입니다.
export const decrypt = function (data) {
  let decryptor = new JSEncrypt(),
      replace = process.env.VUE_APP_PRIVATE_KEY.replace(/\\n/g, "\n");

  decryptor.setPrivateKey(replace);

  return decryptor.decrypt(data);
};