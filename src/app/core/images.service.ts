import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Injectable()
export class ImagesService {
  constructor(
    private readonly http: HttpClient,
  ) {}

  /**
   * Return a random image from unsplash.com
   */
  getImage(): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Client-ID 9f354e7919a3f56e537616f46b1c1e87b5632d7c7227f2bd469762eed79a6296'
    });

    return this.http
      .get('https://api.unsplash.com/photos/random?orientation=landscape&query=event', { headers });
  }

}
