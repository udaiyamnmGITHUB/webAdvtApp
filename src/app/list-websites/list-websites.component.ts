import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../model/user.model";
import { Website } from "src/app/model/website.model";
import { WebsiteManagementService } from "src/app/service/website-management.service";

@Component({
  selector: 'app-list-websites',
  templateUrl: './list-websites.component.html',
  styleUrls: ['./list-websites.component.css']
})
export class ListWebsitesComponent implements OnInit {

  websitesList: Website[];

  constructor(private router: Router, private websiteManagementService: WebsiteManagementService) { }
  
  /**
  * ngOnInit - Method to initialize the component
  */
  ngOnInit() {
    this.websitesList  = this.websiteManagementService.getWebsitesListFromLocalStorage();
  }

 /**
  * addWebsite - Method to navigate to add website
  */
  addWebsite(){
    this.router.navigate(['website-detail']);
  }

  /**
  * addWebsite - Method to delete the website screen
  */
  deleteWebsite(item){
    this.websiteManagementService.deleteWebsiteFromList(item)
  }

  /**
  * editWebsite - Method to navigate to edit website screen
  */
  editWebsite(item){
    this.router.navigate(['website-detail'], { queryParams: { id: item.id, name: item.name, website: item.website } });
  }
}
