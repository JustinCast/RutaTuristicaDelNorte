import { Routes } from "@angular/router";
import { GeneralRootComponent } from "./general/general-root.component";
import { AdminRootComponent } from "./admin/admin-root.component";

export const ROUTES: Routes = [
  { path: "general", component: GeneralRootComponent },
  { path: "admin", component: AdminRootComponent }
];
