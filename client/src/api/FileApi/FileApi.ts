import $api from '../../hooks/useAuth';
import { IRestService, RestService } from '../../services/RestService';
import { FileCreateDTO, FileResponse } from './models';
class FileApi {
  static restService: IRestService = RestService.getInstance();

  static fetchFiles(dirId?: string) {
    const url = `files${dirId ? '?parent=' + dirId : ''}`;
    return $api.get<FileResponse[]>(url);
  }

  static createFile(data: FileCreateDTO) {
    const url = 'file';
    return $api.post<FileCreateDTO, any>(url, { ...data });
  }

  static uploadFile(data: FormData) {
    const url = 'files/upload';
    return $api.post<FormData, any>(url, data, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  }
}

export { FileApi };
