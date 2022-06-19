import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AppMaterialModule } from "../app-material-module";

const components = [];
const directives = [];

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppMaterialModule,
      OverlayModule,
      RouterModule,
      ReactiveFormsModule,
      FormsModule,
  ],
  declarations: [...components, ...directives],
  exports: [
      ...components,
      ...directives,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule,
  ],
  providers: [
  ],
})
export class SharedModule {}
