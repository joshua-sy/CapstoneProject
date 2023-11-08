import 'zone.js/dist/zone';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { IFile } from '../models/file';
import { OpenAIService, Message } from './inputApiCall';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  showLlvm: boolean = false;
  @Input() selectedFile: IFile;
  @Input() selectedLlvm: string;
  
  constructor(private elementRef:ElementRef, private readonly openAiService:OpenAIService) { }
  
  apiKey = ''

  ngOnInit(): void {
  }

  // // Attach the event listener to the gptgenerate element
  // ngAfterViewInit() {
  //   const gptgenerateElement = this.gptgenerate.nativeElement;
  //   gptgenerateElement.addEventListener('keydown', this.handleEnterKey);
  // }

  // Define a method to handle "Enter" key press

  lastEnteredLine = '';
  editorContent = '';
  apiResponse = '';
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleEnterKey();
    }
    else if (event.key == 'Backspace') {
      if (this.lastEnteredLine.length > 0) {
        // Remove the last letter from the string
        this.lastEnteredLine = this.lastEnteredLine.slice(0, -1);
      }
    }
    else {
      this.lastEnteredLine += event.key;
    }
  }
  handleEnterKey() {
    console.log("enter pressed line is ", this.lastEnteredLine);
    console.log("calling api");
    //this.doOpenAICall();
    this.lastEnteredLine = '';
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


  public doOpenAICall() {
    let apiResponse = '';
    const messages: Message[] = [
      {
        // TODO Change this to your own prompt
        content:
          this.lastEnteredLine,
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
      this.editorContent += apiResponse + '\n';
    });

  }
}