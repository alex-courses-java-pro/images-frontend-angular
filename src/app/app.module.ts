import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UploadComponent } from './upload/upload.component';
import { BrowseComponent } from './browse/browse.component';
import { ImagesService } from './service/images.service';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'browse', component: BrowseComponent },
  { path: 'upload', component: UploadComponent },
  { path: 'view:id', component: UploadComponent } // TODO: create component for route
];

@NgModule({
  declarations: [
    AppComponent,
    UploadComponent,
    BrowseComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
