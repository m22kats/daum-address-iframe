import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "addresses", pathMatch: "full" },
  {
    path: "",
    loadChildren: () =>
      import("./addresses/addresses.module").then(
        (m) => m.AddressesModule
      ),
  },
  { path: 'shared', loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) },
  {
    path: "**",
    redirectTo: "/addresses",
    pathMatch: "full",
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }

