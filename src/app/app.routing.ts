import { Routes } from "@angular/router";
import { GeneralRootComponent } from "./general/general-root.component";
import { AdminRootComponent } from "./admin/admin-root.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const ROUTES: Routes = [
  { path: "general", component: GeneralRootComponent },
  { path: "admin", component: AdminRootComponent },
  { path: "", redirectTo: "general/tours", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent }
];
