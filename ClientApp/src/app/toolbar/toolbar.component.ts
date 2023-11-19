import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  // defaultOptions: string = "-S -c -g -fno-discard-value-names -emit-llvm"
  compileOptions: string;

  list : any[];
  options : any[];
  constructor(){
    this.options = [
        {value: 'List'},
        {value: 'Input'},
    ];

    this.list = 
      [
        {name :'-g',checked : true},
        {name :'-c',checked : true},
        {name :'-S',checked : true},
        {name :'-fno-discard-value-names',checked : true},
        {name :'-emit-llvm',checked : true},
        {name :'-pass-exit-codes',checked : false},        
        {name :'-E',checked : false},
        {name :'-v',checked : false},
        {name :'-pipe',checked : false},
        {name :'--help',checked : false},
        {name :'-fcanon-prefix-map',checked : false},
      ]
  }

  @Output() runEventEmitter = new EventEmitter<string>();

  selectedOption: string;

  ngOnInit(): void {
    this.resetCompileOptions();
  }
 
  getCheckedString(): string {
    return this.list.filter(item => item.checked).map(item => item.name).join(' ');
  }


  run() {
    if (this.selectedOption === 'List') {
      console.log("compile options:", this.getCheckedString());
      this.runEventEmitter.emit(this.getCheckedString());
    } else {
      console.log("compile options input:", this.compileOptions);
      this.runEventEmitter.emit(this.compileOptions);
    }
  }

  resetCompileOptions() { 
    this.list = 
    [
      {name :'-g',checked : true},
      {name :'-c',checked : true},
      {name :'-S',checked : true},
      {name :'-fno-discard-value-names',checked : true},
      {name :'-emit-llvm',checked : true},
      {name :'-pass-exit-codes',checked : false},        
      {name :'-E',checked : false},
      {name :'-v',checked : false},
      {name :'-pipe',checked : false},
      {name :'--help',checked : false},
      {name :'-fcanon-prefix-map',checked : false},
    ]
    this.compileOptions = this.getCheckedString();
  }
}
