export function getFromSessionStorage(key, fallbackValue) {
  const item = window.sessionStorage.getItem(key);
  return item ? JSON.parse(item) : fallbackValue;
}
