export type TFIles = {
  data?: TFilesData[];
  currentDir: string;
  loading?: boolean;
};

export type TFilesData = {
  size: number;
  path: string;
  date: string;
  childs: [];
  _id: string;
  name: string;
  type: string;
  parent: string;
  user: string;
};
