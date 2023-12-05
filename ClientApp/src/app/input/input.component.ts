import 'zone.js/dist/zone';
import { Component, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { IFile } from '../models/file';
import { OpenAIService, Message } from './inputApiCall';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FormControl } from '@angular/forms';

//TODO limit

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  @Input() selectedFile: IFile;
  @Input() selectedLlvm: string;
  @Input() files: IFile[];
  @Input() graphsList : any[];

  @ViewChild('gptInput') gptInput: any; 
  constructor(private elementRef:ElementRef, private readonly openAiService:OpenAIService,) { }
  ngOnInit(): void {
    this.initializeForm();
  }
  form: FormControl;
  dropdownList=[]
  showLlvm: boolean = false;
  apiKey = ''
  
  apiResponse = '';
  gptInputQuery = '';  
  apiResponseContent = '';
  
  initializeForm(): void {
    this.form = new FormControl();
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 2 && this.gptInput){    
      console.log(this.graphsList);
      this.dropdownList = [
        { name: "Files", value: this.files },
        { name: "Current LLVM", disabled: !this.selectedLlvm, value: [{ name: this.selectedFile.name + " - LLVM", data: this.selectedLlvm }] },
        { name: "Graphs", disabled: !this.graphsList.length, value: this.graphsList.map(graph => ({ ...graph, name: this.selectedFile.name + " - " + graph.name })) }
      ]
  }}
  
  collateSelectedFilesData(): string {
    console.log(this.form.value);
    let filesDataStr = '';
    if (this.form.value) {

      this.form.value.forEach(file=>{
        filesDataStr += file.name + '\n' + file.data + '\n';
      })
    }
      console.log(filesDataStr);
      return filesDataStr;
    }

  sendQuery() {
    this.apiResponseContent = "Loading response..."
    console.log("get input query: ", this.gptInputQuery)
    let filesData = this.collateSelectedFilesData();
    let message = filesData.length == 0 ? this.gptInputQuery : this.gptInputQuery + filesData;
    this.doOpenAICall(message);
  }
  
  public doOpenAICall(queryMessage:string) {
    let apiResponse = '';
    const messages: Message[] = [
      {
        content:
        queryMessage,
        role: 'user',
      },
    ];
    
    this.openAiService.doOpenAICall(
      messages,
      0.5,
      'gpt-3.5-turbo',
      this.apiKey
      ).subscribe((partialResponse: string) => {
        apiResponse = partialResponse;
      }, null, () => {
        console.log("response, ", apiResponse);
        this.apiResponseContent = "GPT Response: " + apiResponse + '\n';
      });
      
    }
    selectLine(lineNumber) {
      console.log(lineNumber);
      let code = this.elementRef.nativeElement.querySelectorAll('.CodeMirror-code')[0];
      console.log(code);
      console.log(code.children.length);
      for(let i = 0; i < code.children.length; i++) {
        code.children[i].style.background = "unset";
      }
      code.children[lineNumber - 1].style.background = "Yellow";
    }
  }
  