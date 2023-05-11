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
  file: File;
};

type FileDownloadDTO = {
  parent?: UUID;
  file: File;
};

type FileResponseRecently = {
  date: string;
  name: string;
  path: string;
  size: number;
  type: string;
  user: UUID;
  _id: UUID;
};

type FilesPathsDTO = {
  path: string;
  _id: UUID;
};

type FilePayloadDTO = {
  dirId?: string;
  searchableText?: string;
};

export type {
  FileResponse,
  FileCreateDTO,
  FileUploadDTO,
  FileDownloadDTO,
  FileResponseRecently,
  FilesPathsDTO,
  FilePayloadDTO,
};
