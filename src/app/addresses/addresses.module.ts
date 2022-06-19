import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material-module';
import { SharedModule } from '@shared/shared.module';
import { AddressesRoutingModule } from './addresses-routing.module';
import { AddressesComponent } from './addresses.component';
import { AddressCreateDialogComponent } from './address-create-dialog/address-create-dialog.component';


@NgModule({
  declarations: [AddressesComponent, AddressCreateDialogComponent],
  imports: [
    CommonModule,
    AddressesRoutingModule,
    AppMaterialModule,
    SharedModule
  ]
})
export class AddressesModule { }
