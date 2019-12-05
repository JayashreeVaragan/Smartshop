import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Observable } from 'rxjs';

import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/User';
import { UserServiceService } from 'src/app/user-service.service';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from 'src/app/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  type: string;
  option = ["Male", "Female"];


  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserServiceService, private httpClient: HttpClient, private authService: AuthServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.authService.type = this.route.snapshot.paramMap.get('type');
    this.signUpForm = this.formBuilder.group({
      userId: ['', [
        Validators.required,
        this.isUsernameTaken
      ]],
      firstname: ['', [
        Validators.required
      ]],
      lastname: ['', [
        Validators.required
      ]],
      age: ['', [
        Validators.required
      ]],
      gender: ['', [
        Validators.required
      ]],
      contact: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]],
      confirmPassword: ['', [
        Validators.required,
        this.matchConfirmPassword.bind(this)
      ]]
    })
  }
  get userId() {
    return this.signUpForm.get('userId');
  }
  get firstname() {
    return this.signUpForm.get('firstname');
  }
  get lastname() {
    return this.signUpForm.get('lastname');
  }
  get age() {
    return this.signUpForm.get('age');
  }
  get gender() {
    return this.signUpForm.get('gender');
  }
  get contact() {
    return this.signUpForm.get('contact');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }
  matchConfirmPassword(formControl: FormControl): { [s: string]: boolean } {
    if (this.signUpForm) {
      if (formControl.value && formControl.value.length > 0 && formControl.value !== this.signUpForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }
  isUsernameTaken(formControl: FormControl): { [s: string]: boolean } {
    if (formControl.value === 'admin') {
      return { 'userNameTaken': true };
    } else {
      return null;
    }
  }
  addUser(users: User) {
    //let user:User = {userId:this.signUpForm.value["userId"],firstname:this.signUpForm.value["firstname"],lastname:this.signUpForm.value["lastname"],
    //password:this.signUpForm.value["password"],confirmPassword:this.signUpForm.value["confirmPassword"]}
    //console.log(users);
    this.authService.addUser(users).subscribe(
      data => {
        if (data) {
          console.log("logged");
          this.router.navigate(['login'])
        }
        else {
          alert('Already exist');
          this.router.navigate(['signup'])
        }
      });
  }
}
