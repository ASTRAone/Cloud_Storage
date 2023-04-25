import { BreadCrumbStack } from '@utils/common';

import { $api } from '@src/http/http';

import { IRestService, RestService } from '../../services/RestService';
import { FileCreateDTO, FileResponse, FileResponseRecently, FilesPathsDTO } from './models';
class FileApi {
  static restService: IRestService = RestService.getInstance();

  static fetchFiles(dirId?: string) {
    const url = `files${dirId ? '?parent=' + dirId : ''}`;
    return $api.get<FileResponse[]>(url);
  }

  static fetchBreadCrumbs(currentId?: string) {
    const url = `breadcrumbs?currentId=${currentId}`;
    return $api.get<BreadCrumbStack[]>(url);
  }

  static createFile(data: FileCreateDTO) {
    const url = 'file';
    return $api.post<FileCreateDTO, any>(url, { ...data });
  }

  static uploadFile(data: FormData) {
    const url = 'files/upload';
    return $api.post<FormData>(url, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }

  static downloadFile(fileId?: string) {
    const url = `files/download${fileId ? '?id=' + fileId : ''}`;
    return $api.get<any>(url, { responseType: 'blob' });
  }

  static deleteFile(fileId?: string) {
    const url = `files/delete${fileId ? '?id=' + fileId : ''}`;
    return $api.delete<any>(url);
  }

  static searchFile(searchName?: string) {
    const url = `files/search?search=${searchName}`;
    return $api.get<FileResponse[]>(url);
  }

  static fetchRecentlyUploaded() {
    const url = 'recently_files';
    return $api.get<FileResponseRecently[]>(url);
  }

  static fetchFoldersPaths() {
    const url = 'paths_files';
    return $api.get<FilesPathsDTO[]>(url);
  }
}

export { FileApi };
