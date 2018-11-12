import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";
import { AuthService } from "../authentication/auth.service";
import { ToasterService } from "src/app/service/toaster.service";
import {regExpPatterns} from '../constants/application-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toasterService: ToasterService) { }

  /**
  * ngOnInit - Method to initialize the component
  */
  ngOnInit() {
    sessionStorage.clear();
    this.loginForm = this.formBuilder.group({
      userObj: this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required ]
      })
    });
  }

  /**
  * login - Method to login the user with the valid email and password
  */
  login() {
    if (this.loginForm.invalid) {
      return;
    }
    if (this.loginForm.controls.userObj.value) {
      this.authService.login(this.loginForm.controls.userObj.value).subscribe(res => {
        this.toasterService.showSuccess('logged in successfully');
        this.router.navigate(['list-websites']);
      },
        (error => {
          this.toasterService.showError('Invalid email and password combination. Please sign up if you are a new user.');
        }))
    }
    else {
      this.toasterService.showError('Invalid email and password ')
    }
  }

  /**
  * signUp - Method to navigate to the sign up form
  */
  signUp() {
    this.router.navigate(['add-user']);
  }

}
