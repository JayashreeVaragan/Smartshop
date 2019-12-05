import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userList = [
    { userId: "jack", firstname: "John", lastname: "Steve", password: "jack12" },
    { userId: "admin", firstname: "Jayashree", lastname: "V", password: "12345" }
  ];
  userRole: string;
  userId: string;

  constructor(private router: Router, private httpClient: HttpClient) { }

  addUser(user: User) {
    return this.httpClient.post<User>('http://localhost:9097/users', user);
  }
  getUser(userId: string) {
    let user = this.userList.filter((user) => (user.userId == userId));
    return user[0];
  }
}
