export const sortedData = (data: any) => {
  return [...data].sort((a, b) => (a.type > b.type ? 1 : -1));
};

export const getFileExtension = (str: string): string | null => {
  const type = str.match(/\.([^.]+)$|$/);
  return type && type[1];
};
