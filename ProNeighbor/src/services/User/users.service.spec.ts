import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
describe('UsersService', () => {
  let service: UsersService;

  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UsersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(UsersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should get user profile', () => {
    const dummyData = {
      id: '85755A9C-8010-414C-8E46-10AA36F0BA41',
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+123456789',
      address: '123 Main St',
    };

    service.getUserProfile().subscribe((data) => {
      expect(data as any).toEqual(dummyData);
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/user/profile',
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush(dummyData);
  });
  it('Should update user profile', () => {
    const updatedData = {
      name: 'John Updated',
      email: 'johnupdated@example.com',
      phone: '+987654321',
      address: '456 New St',
    };

    service.updateUserProfile(updatedData as any).subscribe((data) => {
      expect(data.message).toEqual('Profile updated successfully');
    });

    const req = httpTestingController.expectOne(
      'http://localhost:3000/api/user/profile',
    );

    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.has('Authorization')).toBeTrue();
    req.flush({ message: 'Profile updated successfully' });
  });
});
