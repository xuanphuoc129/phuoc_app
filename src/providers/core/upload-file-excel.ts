// import { HttpHeaders, HttpParams, HttpRequest, HttpClient } from "@angular/common/http";
// // import { Cafe69SFSConnector } from "../cafe69-smaxfox/cafe69-connector";

// export class UploadFileExcel {

//     public static _intance: UploadFileExcel = null;

//     private mDebug: boolean = true;

//     public http: HttpClient = null;

//     constructor() {

//     }

//     public static getInstance(): UploadFileExcel {
//         if (this._intance == null) {
//             this._intance = new UploadFileExcel();
//         }
//         return this._intance;
//     }

//     public setHttp(http: HttpClient) {
//         this.http = http;
//     }


//     public openChooseFileExcel(callback?: any) {
//         let input = document.createElement("input");
//         input.type = "file";
//         input.onchange = (data) => {
//             let file = input.files[0];
//             if (this.mDebug) {
//                 console.log("File", file);
//             }

//             let fileName = file.name;
//             if (fileName.endsWith("xls") || fileName.endsWith("xlsx")) {
//                 callback({ file: file, fileName: fileName })
//             } else {
//                 callback({ file: file, fileName: fileName })
//                 // callback();
//             }
//         }
//         document.body.appendChild(input);
//         input.click();
//     }

//     public _onUploadFileInBrowser(file, fileName, cmd): Promise<any> {
//         return new Promise((resolve, reject) => {
//             if(this.http == null)return;
//             if (file) {
//                 if(this.mDebug){
//                     console.log("upload file");
//                 }
//                 var formData: FormData = new FormData();
//                 formData.append("file", file);

//                 var headers: HttpHeaders = new HttpHeaders();
//                 headers.append('Content-Type', null);
//                 headers.append('Accept', 'multipart/form-data');

//                 var httpParams: HttpParams = new HttpParams();
//                 httpParams = httpParams.append('sessHashId', Cafe69SFSConnector.getInstance().getSessionToken());
//                 httpParams = httpParams.append("__command", cmd);
//                 httpParams = httpParams.append("__fileName", fileName);
                
//                 if(this.mDebug){
//                     console.log("params", httpParams);
//                 }

//                 const req = new HttpRequest('POST', "http://" + Cafe69SFSConnector.getInstance().getSFSHost() + ":" + Cafe69SFSConnector.getInstance().getSFSPort() + "/BlueBox/SFS2XFileUpload?sessHashId=" + Cafe69SFSConnector.getInstance().getSessionToken(), formData, {
//                     reportProgress: true,
//                     responseType: 'text',
//                     params: httpParams,
//                     headers: headers
//                 });

               

//                 this.http.request(req).subscribe(data => {
//                     resolve(data);
//                 });

//             } else {
//                 reject("Please select file first");
//             }
//         })
//     }
// }