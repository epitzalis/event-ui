import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ImagesService } from './images.service';

describe('UserService', () => {

  let service: ImagesService;
  let httpMock: HttpTestingController;

  /**
   * testbed configuration
   */
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ImagesService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    service = TestBed.get(ImagesService);
    httpMock = getTestBed().get(HttpTestingController);
  });

  afterEach(() => {
    /**
     * Check that there aren't pending requests
     */
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getImage get image', () => {
    const mockImg = {
      urls: {
        small: 'imgURL',
      },
    };
    service.getImage().subscribe((resp: any) => {
      expect(resp).toEqual(mockImg);
    });

    const req = httpMock.expectOne('https://api.unsplash.com/photos/random?orientation=landscape&query=event');
    expect(req.request.method).toBe('GET');
    req.flush(mockImg);
  });

});
