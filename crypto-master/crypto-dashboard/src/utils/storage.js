export const storage = {
  save: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  load: (key) => JSON.parse(localStorage.getItem(key))
};