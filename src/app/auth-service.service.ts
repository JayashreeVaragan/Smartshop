import { Injectable } from '@angular/core';
import { UserServiceService } from './user-service.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { User } from './User';
import { ProductServiceService } from './services/product-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loggedInUser = { loggedOut: true };
  validCredentials: boolean = true;
  accessToken: string;
  redirectUrl = '/';
  loggedIn: boolean = false;
  private token: string;
  private id: number;
  type: string;
  userrole: string;
  isAdmin: boolean = false;
  isUser: boolean = false;

  constructor(private httpClient: HttpClient, private userService: UserServiceService, public router: Router) { }

  authenticate(userId: string, password: string): Observable<any> {
    let credentials = btoa(userId + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.httpClient.get('http://localhost:8087/authentication-service/authenticate', { headers });
  }

  public setToken(token: string) {
    //this.setToken(token);
    this.token = token;
  }
  public getToken() {
    return this.token;
  }
  public setId(id: number) {
    this.id = id;
  }
  public getId() {
    return this.id;
  }

  authenticateUser(user) {
    this.authenticate(user.userId, user.password).subscribe(
      (data) => {
        this.loggedInUser = user;
        this.validCredentials = true;
        this.userrole = data.role;
        this.userService.userId = data.username;
        this.loggedIn = true;
        this.token = data.token;
        if (this.userrole == 'superuser') {
          console.log("in if");
          this.router.navigate(['superuser'])
        }
        else if (this.userrole == 'admin') {
          this.isAdmin = true;
          this.router.navigate(['search-box'])
        }

        else if (this.userrole == 'user') {
          this.isUser = true;
          this.router.navigate(['search-box'])
        }
      },
      (error) => {
        this.validCredentials = false;
      })
  }
  logout() {
    this.loggedInUser = { loggedOut: true };
    this.loggedIn = false;
    this.isAdmin = false;
    this.isUser = false;
    this.router.navigate(['login']);
  }
  addUser(user: User) {
    if (this.type == "user") {
      return this.httpClient.post<User>('http://localhost:8087/authentication-service/users/U', user);
    }
    else {
      return this.httpClient.post<User>('http://localhost:8087/authentication-service/users/A', user);
    }
  }
  adminInfo(): Observable<User[]> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    return this.httpClient.get<User[]>('http://localhost:8087/authentication-service/users/admin', { headers });
  }

  response(user: User): Observable<User> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.getToken());
    return this.httpClient.put<User>('http://localhost:8087/authentication-service/users', user, { headers });
  }
}
