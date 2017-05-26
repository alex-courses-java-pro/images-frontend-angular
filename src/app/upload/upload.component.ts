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

  constructor(private imagesService: ImagesService,
    private router: Router) { }

  ngOnInit() {
  }

  upload() {
    this.imagesService.uploadImage(this.files[0]);
  }

  getFiles(event: any) {
    this.files = event.target.files;
  }

  getId(event: any) {
    this.imageId = event.target.value;
  }

  searchForImage() {
    console.log(this.imageId);
    this.router.navigate(['/view', { imageId: this.imageId }]);
  }
}
