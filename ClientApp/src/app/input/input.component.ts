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
  showLlvm: boolean = false;
  @Input() selectedFile: IFile;
  @Input() selectedLlvm: string;
  @Input() files: IFile[];
  selectedFiles: any[] = [];

  constructor(private elementRef:ElementRef, private readonly openAiService:OpenAIService ) { }
  
  @ViewChild('gptgenerate') gptgenerate: any; 


  ngOnInit(): void {
    this.editorContent = "Hi! Welcome to Code GPT. Edit this and enter your query..."
  }
  
  //Enter your api key here...
  apiKey = ''

  lastEnteredMessage = '';
  editorContent = '';
  apiResponse = '';
  
  allowedKeys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:'\",.<>?/\\~`-= ";

  // Define a method to handle "Enter" key press
  onKeyDown(event: KeyboardEvent) {
    if (event.key == 'Backspace') {
      if (this.lastEnteredMessage.length > 0) {
        // Remove the last letter from the string
        this.lastEnteredMessage = this.lastEnteredMessage.slice(0, -1);
      }
    } else if (event.key == 'Enter'){
      this.lastEnteredMessage = this.lastEnteredMessage + '\n';

    } else if (this.allowedKeys.includes(event.key) ) {
      this.lastEnteredMessage += event.key;
    }
  }

  sendQuery() {
    console.log("calling api");
    console.log("last entered message: ", this.lastEnteredMessage)
    // this.doOpenAICall();
    this.lastEnteredMessage = '';
  }

  onFileSelectionChange(): void {
    // Perform any additional logic based on the selectedFiles array
    console.log('Selected Files:', this.selectedFiles);
  }

  onTabChange(event: MatTabChangeEvent): void {
    if (event.index === 2){    
      if (this.gptgenerate && this.gptgenerate.codeMirror) {
        this.gptgenerate.codeMirror.setValue(this.editorContent);
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

  onEditorContentChange(newValue: string) {
    this.editorContent = newValue;
  }


  public doOpenAICall() {
    let apiResponse = '';
    const messages: Message[] = [
      {
        content:
          this.lastEnteredMessage,
        role: 'user',
      },
    ];

    this.openAiService.doOpenAICall(
      messages,
      0.5,
      'gpt-3.5-turbo',
      this.apiKey
    ).subscribe((partialResponse: string) => {
      // Append the partial response to the existing content
      apiResponse = partialResponse;
    }, null, () => {
      // The third parameter in subscribe is the complete callback
      // It's called when the response is fully received
      console.log(apiResponse);
      this.editorContent += "Gpt Response: " + apiResponse + '\n';
    });

  }
}