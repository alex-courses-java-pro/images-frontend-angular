import { ImagesService } from '../service/images.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  imgId: number;
  imgUrl: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private imgService: ImagesService
  ) { }

  ngOnInit() {
    this.imgId = Number(this.route.snapshot.params['id']);
    this.imgUrl = this.imgService.getBaseUrl() + '/' + this.imgId;
  }

  onDelete() {
    const ids: number[] = [this.imgId];
    this.imgService.deleteImages(ids);
    this.router.navigate(['/upload']);
  }
}
