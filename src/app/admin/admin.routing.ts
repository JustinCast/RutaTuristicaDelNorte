import { Routes } from "@angular/router";
import { AdminRootComponent } from "./admin-root.component";
import { AddServiceComponent } from "./add-service/add-service.component";
import { LoggedInGuard } from './logged-in.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTourComponent } from './add-tour/add-tour.component';
import { EditServiceComponent } from './dashboard/edit-service/edit-service.component';
import { EditTourComponent } from './dashboard/edit-tour/edit-tour.component';

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
        path: "add-tour",
        component: AddTourComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "edit-service/:id_service",
        component: EditServiceComponent
      },
      {
        path: "edit-tour/:id_tour",
        component: EditTourComponent
      },
    ],
    canActivateChild: [LoggedInGuard]
  }
];
