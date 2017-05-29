import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { BrowseComponent } from './browse/browse.component';
import { ImagesService } from './service/images.service';
import { Routes, RouterModule } from '@angular/router';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'browse', component: BrowseComponent },
  { path: 'view/:id', component: ViewComponent } // TODO: create component for route
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    BrowseComponent,
    ViewComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
