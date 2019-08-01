import { Routes } from "@angular/router";
import { AdminRootComponent } from "./admin-root.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import { LoggedInGuard } from './logged-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: "admin",
    component: AdminRootComponent,
    children: [
      {
        path: "add-service",
        component: AddServiceComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
    ],
    canActivateChild: [LoggedInGuard]
  }
];
