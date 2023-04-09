export const removeDupplicateItems = (listOriginal: any, listFilter: any, name: string) => {
  return listOriginal.filter((o1: any) => !listFilter.some((o2: any) => o1[name] === o2[name])) || [];
};
