import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";

export enum ResponseTypeEnum {
  SUCCEED = "Succeed",
  ERROR = "Error",
  VALIDATE = "Validate"
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackbar: MatSnackBar,
    private zone: NgZone,
  ) { }

  openSnackbar(message: string, type: ResponseTypeEnum) {
    this.zone.run(() => {
      this._snackbar.open(message, type, {
        duration: 2000,
      });
    });
  }
}