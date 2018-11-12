import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { User } from "../model/user.model";
import { WebsiteManagementService } from "src/app/service/website-management.service";
import { Website } from "src/app/model/website.model";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToasterService } from "src/app/service/toaster.service";
import 'rxjs/add/operator/filter';
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-add-websites',
  templateUrl: './websites-detail.component.html',
  styleUrls: ['./websites-detail.component.css']
})
export class WebsitesDetailComponent implements OnInit {
  title: string;
  btnName: string;

  websiteObj: Website;
  isEditMode: boolean = false;
  addWebsiteForm: FormGroup;
  createPageTitle: string = "Add your website here";
  editPageTitle: string = "Edit your website here";
  editPageSaveBtn: string = "update";
  createPageSaveBtn: string = "save";

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private websiteManagementService: WebsiteManagementService,
    private toasterService: ToasterService) { }

  /**
  * ngOnInit - Method to initialize the component
  */
  ngOnInit() {
    this.websiteObj = new Website();
    this.route.queryParams
      .subscribe(params => {
        this.websiteObj.id = params.id;
        this.websiteObj.name = params.name;
        this.websiteObj.website = params.website;
      });
    this.addWebsiteForm = this.formBuilder.group({
      website: this.formBuilder.group({
        website: [this.websiteObj.website, Validators.required],
        name: [this.websiteObj.name, Validators.required],
        id: [this.websiteObj.id]
      })
    });
    // check if the form is in edit mode
    if (this.websiteObj.id) {
      this.isEditMode = true;
    }
    else {
      this.isEditMode = false;
    }
    this.setMode(this.isEditMode);
  }

  /**
  * setMode - Method to set properties based on mode of action
  */
  setMode(editMode: boolean) {
    if (editMode) {
      this.title = this.editPageTitle;
      this.btnName = this.editPageSaveBtn;
    }
    else {
      this.title = this.createPageTitle;
      this.btnName = this.createPageSaveBtn;
    }
  }

  /**
  * submit - Method to submit the form to create or update
  */
  submit() {
    if (this.isEditMode) {
      this.update();
    }
    else {
      this.save();
    }
  }

  /**
  * update - Method to update the website and call the API
  */
  update() {
    if (this.addWebsiteForm.value.website) {
      let websiteObj: Website = this.addWebsiteForm.value.website;
      this.websiteManagementService.updateWebsite(this.addWebsiteForm.controls.website.value).subscribe(res => {

        if (!(res instanceof HttpErrorResponse)) {
          this.toasterService.showSuccess('your website is updated successfully');
          this.router.navigate(['list-websites']);
        }
        else {
          this.toasterService.showInfo('Server is down. website is updated in browser session. It will be reset when you refresh the page.');
          this.websiteManagementService.updateWebsiteList(websiteObj);
          this.router.navigate(['list-websites']);
        }
      })
    }
    else {
      this.showErrorMessage();
    }
  }

  /**
  * save - Method to create a website and call the API
  */
  save() {
    if (this.addWebsiteForm.invalid) {
      return;
    }
    if (this.addWebsiteForm.value.website) {
      let websiteObj: Website = this.addWebsiteForm.value.website;
      let uniqueValue = new Date().getTime();
      websiteObj.id = Number(uniqueValue);
      this.websiteManagementService.createWebsite(this.addWebsiteForm.controls.website.value).subscribe(res => {
        if (!(res instanceof HttpErrorResponse)) {
          this.toasterService.showSuccess('your website is added successfully');
          this.router.navigate(['list-websites']);
        }
        else {
          this.toasterService.showInfo('Server is down. New website is saved in browser session. It will be reset when you refresh the page.');
          this.websiteManagementService.storeWebsitesList(websiteObj);
          this.router.navigate(['list-websites']);
        }
      });
    }
    else {
      this.showErrorMessage();
    }
  }

  /**
  * showErrorMessage - Method to show error message if the form is invalid
  */
  showErrorMessage() {
    this.toasterService.showError('Invalid website. Please try again.');
  }
}
