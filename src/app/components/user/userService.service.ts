import { Injectable } from '@angular/core';
import { userRoleEnum } from '../../types/roles';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = 'https://jsonplaceholder.typicode.com';
  constructor(private http: HttpClient) {}
  get() {
    return this.http.get(`${this.url}/comments`);
  }
}
