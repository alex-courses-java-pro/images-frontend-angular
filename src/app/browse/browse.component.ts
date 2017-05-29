import { Image } from '../model/image';
import { ImagesService } from '../service/images.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {
  imagesFG: FormGroup;

  images: Array<Image> = [];
  ids: Array<number> = [];

  constructor(
    private fbuilder: FormBuilder,
    private imgsService: ImagesService
  ) { }

  ngOnInit() {
    this.imagesFG = this.fbuilder.group({
      checkboxes: this.fbuilder.group({})
    });

    this.getImages();
  }

  getImages() {
    this.imgsService.getAllImages().subscribe(
      res => {
        this.images = <Image[]>res.images;
        this.images.forEach(image => {
          (<FormGroup>this.imagesFG.controls['checkboxes']).addControl(image.id.toString(), new FormControl(false));
        });
      }
    );
  }



  deleteImages(ids: number[]) {
    this.imgsService.deleteImages(ids);
  }

  downloadImages(ids: number[]) {
    this.imgsService.downloadZip(ids)
      .subscribe(res => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl);
      });
  }

  onDownload() {
    let checkboxes: FormGroup = <FormGroup>this.imagesFG.controls['checkboxes'];
    for (let image of this.images) {
      let checkbox: FormControl = <FormControl>checkboxes.get(image.id.toString());
      if (checkbox.value) {
        this.ids.push(image.id);
      }
    }
    console.log('ids to zip and download ' + this.ids);
    this.downloadImages(this.ids);
    this.ids = [];
    this.getImages();
  }

  onDelete() {
    let checkboxes: FormGroup = <FormGroup>this.imagesFG.controls['checkboxes'];
    for (let image of this.images) {
      let checkbox: FormControl = <FormControl>checkboxes.get(image.id.toString());
      if (checkbox.value) {
        this.ids.push(image.id);
      }
    }
    console.log('ids to delete ' + this.ids);
    this.imgsService.deleteImages(this.ids);
    this.ids = [];
    this.getImages();
  }

}


