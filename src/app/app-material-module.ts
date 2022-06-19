import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatIconModule, MatIconRegistry } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";


const mm = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSnackBarModule,
  MatTableModule,
];

@NgModule({
  imports: [...mm],
  exports: [...mm],
  providers: [],
})
export class AppMaterialModule {
  constructor(public matIconRegistry: MatIconRegistry) {
  }

  static forRoot(): ModuleWithProviders<AppMaterialModule> {
    return {
      ngModule: AppMaterialModule,
      providers: [MatIconRegistry],
    };
  }
}
