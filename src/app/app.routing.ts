import { Routes } from "@angular/router";
import { EnterpriseComponent } from "./enterprise/enterprise.component";
import { HomeComponent } from './home/home.component';

export const ROUTES: Routes = [
  { path: "", component: HomeComponent },
  { path: "enterprise/:id", component: EnterpriseComponent },
];
