export const setStorage = (key: string, value: string): void => {
  window.localStorage.setItem(key, value);
};

export const getStorage = (key: string): string | null => window.localStorage.getItem(key);

export const deleteItemStorage = (key: string): void => {
  window.localStorage.removeItem(key);
};

export const deleteStorage = (): void => {
  window.localStorage.clear();
};
