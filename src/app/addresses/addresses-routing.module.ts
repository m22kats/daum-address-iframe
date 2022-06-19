import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesComponent } from './addresses.component';

const routes: Routes = [{ 
  path: "",
  children: [
    {
      path: "addresses",
      component: AddressesComponent,
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressesRoutingModule { }
