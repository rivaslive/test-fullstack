import CryptoJS from 'crypto-js';

const encryptPass = (import.meta.env.VITE_ENCRYPT_PASS as string) ?? 'password';

const encrypt = {
  set: (content: string) => {
    return CryptoJS.AES.encrypt(content, encryptPass).toString();
  },
  get: (contentCrypt: string) => {
    const bytes = CryptoJS.AES.decrypt(contentCrypt, encryptPass);
    return bytes.toString(CryptoJS.enc.Utf8);
  },
};

export default encrypt;
