const key = "WEB-CHAT";

export const storeItem = (item, type) => sessionStorage.setItem(`${key}-${type}`, item);
export const getItem = type => sessionStorage.getItem(`${key}-${type}`);
export const destroyItem = type => sessionStorage.removeItem(`${key}-${type}`);


