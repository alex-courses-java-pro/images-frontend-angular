import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, ResponseContentType } from '@angular/http';
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

  getImage(id: String) {
    this.http.get(this.baseUrl + '/' + id).map(
      res => res.json()
    ).subscribe(
      data => { console.log(data); },
      err => { console.log(err); }
      );
  }

  deleteImages(ids: number[]) {
    this.http.delete(this.baseUrl).map(
      res => console.log(res)
    ).subscribe(
      err => { console.log(err); }
      );
  }

  uploadImage(file: any) {
    this.http.post(this.baseUrl, file).subscribe(res => { console.log(res); });
  }

  downloadZip(ids: number[]) {
    return this.http.post(this.baseUrl + '/download/zip', ids, { responseType: ResponseContentType.Blob })
      .map(res => {
        return new Blob([res.blob()], { type: 'application/octet-stream' });
      });
  }

}
