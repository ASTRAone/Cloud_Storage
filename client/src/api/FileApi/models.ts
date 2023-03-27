import { TypeFile, UUID } from '../../utility/common';

type FileResponse = {
  path: string;
  date: string;
  childs: any[];
  _id: UUID;
  name: string;
  size: number;
  type: TypeFile;
  user: UUID;
};

type FileCreateDTO = {
  name: string;
  parent?: UUID;
  type?: TypeFile;
};

type FileUploadDTO = {
  parent?: UUID;
  file: any;
};

type FileDownloadDTO = {
  parent?: UUID;
  file: any;
};

export type { FileResponse, FileCreateDTO, FileUploadDTO, FileDownloadDTO };
