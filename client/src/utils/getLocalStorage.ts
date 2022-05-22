export const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key)!);
