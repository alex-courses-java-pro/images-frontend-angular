import { ImagesService } from '../service/images.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  files: FileList;
  imageId: number;
  fileName = '';

  constructor(private imagesService: ImagesService,
    private router: Router) { }

  ngOnInit() {
  }

  upload() {
    this.imagesService.uploadImage(this.files[0])
      .subscribe(res => {
        this.imageId = res;
        this.searchForImage();
      });
  }

  getFiles(event: any) {
    this.files = event.target.files;
    this.fileName = this.files[0].name;
    console.log(this.files[0]);
  }

  getId(event: any) {
    this.imageId = event.target.value;
  }

  searchForImage() {
    console.log(this.imageId);
    this.router.navigate(['/view', this.imageId]);
  }
}
