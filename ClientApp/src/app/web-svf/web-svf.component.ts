import { Component, OnInit, ViewChild } from '@angular/core';
import { GraphsComponent } from '../graphs/graphs.component';
import { InputComponent } from '../input/input.component';
import { IFile } from '../models/file';
import { OutputComponent } from '../output/output.component';
import { SvfService } from '../svf.service';
import { ErrorDialog } from '../web-svf/error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-web-svf',
  templateUrl: './web-svf.component.html',
  styleUrls: ['./web-svf.component.css']
})
export class WebSvfComponent implements OnInit {
  selectedFile: IFile;
  selectedLlvm: string;
  files: IFile[] = [];
  constructor(private svfService: SvfService, public dialog: MatDialog) { }

  @ViewChild('input') input: InputComponent;
  @ViewChild('output') output: OutputComponent;
  @ViewChild('graphs') graphs: GraphsComponent;

  ngOnInit(): void {
    this.initialiseDirectory();
  }
  openDialog(errorMessage:string) {
    const dialogRef = this.dialog.open(ErrorDialog, {
      height: '350px',
      data: { errorMessage }

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  run($event) {
    this.svfService.run({ input: this.selectedFile.data, compileOptions: $event }).subscribe(
      (result) => {
        this.output.output += '\n' + result.output;
        this.graphs.outputs = result.graphs;
        this.selectedLlvm = result.llvm;
        console.log(result);
      },
      (error) => {
        let errorMessage = error.message + ". There was a compilation error in your code that prevented an LLVM file from being generated. Please fix this error and try again."
        this.openDialog(errorMessage);
        console.error(error);
      }
    );
  }

  initialiseDirectory() {
    this.files.push({
      id: this.files.length,
      name: 'New File',
      data: "#include <stdio.h>\nint main() {\n   \/\/ printf() displays the string inside quotation\n   printf(\"Hello, World!\");\n   return 0;\n};"
    });
    this.selectedFile = this.files[0];
    console.log('Selected file is: ' + this.selectedFile.id);
  }

  createNewFile() {
    const newFile = {
      id: this.files.length,
      name: 'New File ' + this.files.length,
      data: "Enter your code here..."
    };
    this.files.push(newFile);
    this.switchFile(newFile);

  }

  switchFile(file) {
    this.selectedFile = file;
    this.selectedLlvm = '';
  }

  selectLineOnInput(event) {
    this.input.selectLine(parseInt(event));
  }

  closeFile(file) {
    const index = this.files.indexOf(file, 0);
    if (index >= 0) {
      this.files.splice(index, 1);
    }
  }

}
