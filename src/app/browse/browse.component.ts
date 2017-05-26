import { ImagesService } from '../service/images.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  images: Array<any> = [];

  constructor(private imgsService: ImagesService) { }

  ngOnInit() {
    this.getImages();
    console.log(this.images);
  }

  getImages() {
    this.imgsService.getAllImages().subscribe(
      data => {
        data.images.forEach(image => {
          this.images.push({
            'id': image.id,
            'uri': image.uri
          });
        });
      },
      err => { console.log(err); }
    );
  }

  deleteImages(ids: number[]) {
    this.imgsService.deleteImages(ids);
  }

  downloadImages(ids: number[]) {
    this.imgsService.downloadZip(ids)
      .subscribe(res => {
        // saveAs(res, 'images.zip');
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl);
      });
  }
}
