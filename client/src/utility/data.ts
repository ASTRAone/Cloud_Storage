export const sortedData = (data: any) => {
  return [...data].sort((a, b) => (a.type > b.type ? 1 : -1));
};
