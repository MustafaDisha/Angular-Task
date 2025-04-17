import { Injectable } from '@angular/core';
import { userRoleEnum } from '../../types/roles';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: userRoleEnum;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  users: User[] = [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice@example.com',
      password: '123456',
      role: userRoleEnum.admin,
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Smith',
      email: 'bob@example.com',
      password: 'password',
      role: userRoleEnum.user,
    },
  ];
}
