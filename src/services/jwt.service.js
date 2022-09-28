const key = "WEB-CHAT";

export const storeItem = (item, type) => localStorage.setItem(`${key}-${type}`, item);
export const getItem = type => localStorage.getItem(`${key}-${type}`);
export const destroyItem = type => localStorage.removeItem(`${key}-${type}`);


