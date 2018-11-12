import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {ListWebsitesComponent} from "./list-websites/list-websites.component";
import { AuthGaurdService } from "./authentication/auth-gaurd.service";
import { WebsitesDetailComponent } from "./websites-detail/websites-detail.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'add-user', component: AddUserComponent},
  { path: 'list-websites', component: ListWebsitesComponent  ,canActivate: [AuthGaurdService]},
  { path: 'website-detail', component: WebsitesDetailComponent  ,canActivate: [AuthGaurdService]},
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
