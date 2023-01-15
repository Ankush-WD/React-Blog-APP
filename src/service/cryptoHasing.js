import CryptoJS from "crypto-js";

export const encryptAES = (message, key, iv) => {
  const ciphertext = CryptoJS.AES.encrypt(message, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv) });
  return ciphertext.toString();
};

export const dcryptAES = (encrypted, key, iv) => {
  const bytes = CryptoJS.AES.decrypt(encrypted, CryptoJS.enc.Utf8.parse(key), { iv: CryptoJS.enc.Utf8.parse(iv)});
  return bytes.toString(CryptoJS.enc.Utf8);
};
