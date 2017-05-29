import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Response,
  RequestOptions,
  ResponseContentType
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class ImagesService {
  private baseUrl = 'http://localhost:8080/images';

  constructor(private http: Http) { }

  getAllImages() {
    return this.http.get(this.baseUrl).map(
      res => res.json());
  }

  getImage(id: number) {
    return this.http.get(this.baseUrl + '/' + id).map(
      res => res.json()
    );
  }

  deleteImages(ids: number[]) {
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let options = new RequestOptions({
      headers: headers,
      body: ids
    });

    this.http.delete(this.baseUrl, options)
      .map(res => console.log(res))
      .subscribe(err => { console.log(err); });
  }

  uploadImage(file: File) {
    let formData: FormData = new FormData();
    formData.append('image', file, file.name);

    let headers: Headers = new Headers();
    headers.append('Accept', 'application/json');

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl, formData, options)
      .map(res => res.json());
      // .catch(err => Observable.throw(err))
      // .subscribe(
      // data => console.log(data),
      // err => console.log(err)
      // );
  }

  downloadZip(ids: number[]) {
    return this.http.post(this.baseUrl + '/download/zip', ids, { responseType: ResponseContentType.Blob })
      .map(res => {
        return new Blob([res.blob()], { type: 'application/octet-stream' });
      });
  }

  getBaseUrl() {
    return this.baseUrl;
  }
}
