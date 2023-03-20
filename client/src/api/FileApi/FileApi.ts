import { IRestService, RestService } from "../../services/RestService";

import { FileCreateDTO, FileResponse, FileUploadDTO } from "./models";
class FileApi {
  static restService: IRestService = RestService.getInstance();

  static fetchFiles(dirId?: string) {
    const url = `files${dirId ? "?parent=" + dirId : ""}`;
    return this.restService.GET<FileResponse[]>(url);
  }

  static createFile(data: FileCreateDTO) {
    const url = "files";
    return this.restService.POST<FileCreateDTO, any>(url, { data });
  }

  static uploadFile(data: FormData) {
    const url = "files/upload";
    return this.restService.POST<FormData, any>(url, { data });
  }
}

export { FileApi };
