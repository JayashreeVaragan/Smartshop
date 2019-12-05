import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.loggedIn();
    this.router.navigate(['search-box']);
  }
  constructor(public router: Router, private authService: AuthServiceService) {
  }
  title = 'Smart Shop';
  isLoggedIn: boolean = false;


  loggedIn(): boolean {
    if (!this.authService.loggedInUser.loggedOut) {
      this.isLoggedIn = true;
      return true
    }
    else {
      this.isLoggedIn = false;
      return false;
    }
  }

}
