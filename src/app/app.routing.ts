import { Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { GeneralRootComponent } from "./general/general-root.component";
import { AdminRootComponent } from "./admin/admin-root.component";
import { LoggedInGuard } from './admin/logged-in.guard';

export const ROUTES: Routes = [
  { path: "general", component: GeneralRootComponent },
  { path: "admin", component: AdminRootComponent }
];
