import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'error-dialog',
    templateUrl: 'error-dialog.component.html',
  })
  export class ErrorDialog {
    errorMessage: string;

    constructor(@Inject(MAT_DIALOG_DATA) data: any) {
      this.errorMessage = data.errorMessage;
    }
  }