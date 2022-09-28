export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-xxxx-xxxxxxxxxxxx".replace(/[x]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    return r.toString(16);
  });
};
