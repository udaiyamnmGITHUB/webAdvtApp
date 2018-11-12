import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../authentication/auth.service";
import { User } from "../model/user.model";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";
import { ToasterService } from "src/app/service/toaster.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private toasterService: ToasterService) { }

  addForm: FormGroup;
  userObj: User;

  /**
   *ngOnInit - Method to initialize the component 
  */
  ngOnInit() {

    this.addForm = this.formBuilder.group({
      userObj: this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required]
      })
    });

  }
  
  /**
   *onSubmit - Method to register a new customer 
  */
  onSubmit() {
    this.authService.signUp(this.addForm.value.userObj)
      .subscribe(data => {
        if (!(data instanceof HttpErrorResponse)) {
          this.router.navigate(['login']);
          this.toasterService.showSuccess('Your email is registered successfully. Please login now.');
        }
        else {
          this.toasterService.showError('We could not register your account. Please try again');
        }
      });
  }

}
