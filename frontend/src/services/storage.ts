import libEncrypt from './crypto';

const storage = {
  get(key: string, encrypt = false): any {
    const value = localStorage.getItem(key) ?? '';
    if (encrypt && value) {
      return JSON.parse(libEncrypt.get(value));
    }
    return value ? JSON.parse(value) : value;
  },
  set(key: string, value: any, encrypt = false): void {
    let newValue = JSON.stringify(value);

    if (encrypt) {
      newValue = libEncrypt.set(newValue);
    }

    localStorage.setItem(key, newValue);
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

export default storage;
