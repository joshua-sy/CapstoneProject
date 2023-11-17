import 'zone.js/dist/zone';
import { Component, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { IFile } from '../models/file';
import { OpenAIService, Message } from './inputApiCall';
import { MatTabChangeEvent } from '@angular/material/tabs';

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
  

  @ViewChild('gptInput') gptInput: any; 

  constructor(private elementRef:ElementRef, private readonly openAiService:OpenAIService ) { }
  
  showLlvm: boolean = false;
  selectedFiles: any[] = [];
  
  apiKey = ''

  editorContent = '';
  apiResponse = '';
  gptInputQuery = '';  
  apiResponseContent = '';
  ngOnInit(): void {
  }
  
  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 2){    
      if (this.gptInput && this.gptInput.codeMirror) {
        this.gptInput.codeMirror.setValue(this.editorContent);
      }
  }}

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
  
  collateSelectedFilesData(): string {
    // Perform any additional logic based on the selectedFiles array
    let filesDataStr = '';
    this.selectedFiles.forEach(file=>{
      filesDataStr += file.name + '\n' + file.data + '\n';
    })
    console.log(filesDataStr);
    return filesDataStr;
  }

  sendQuery() {
    this.apiResponseContent = "Loading response..."
    console.log("get input query: ", this.gptInputQuery)
    console.log('Selected Files:', this.selectedFiles);
    this.editorContent += '\n';
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
      this.apiResponseContent = "Gpt Response: " + apiResponse + '\n';
    });

  }
}