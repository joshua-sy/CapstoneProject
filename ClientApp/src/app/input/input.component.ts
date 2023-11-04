import 'zone.js/dist/zone';
import { Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { IFile } from '../models/file';
import { OpenAIService, Message } from './inputApiCall';
import { of } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})

export class InputComponent implements OnInit {
  showLlvm: boolean = false;
  @Input() selectedFile: IFile;
  @Input() selectedLlvm: string;
  @ViewChild('gptgenerate') gptgenerate: ElementRef;
  
  constructor(private elementRef:ElementRef, private readonly openAiService:OpenAIService) { }
  
  apiKey = ''
  public openAiResult$ = of('');

  ngOnInit(): void {
  }

  // // Attach the event listener to the gptgenerate element
  // ngAfterViewInit() {
  //   const gptgenerateElement = this.gptgenerate.nativeElement;
  //   gptgenerateElement.addEventListener('keydown', this.handleEnterKey);
  // }

  // Define a method to handle "Enter" key press
  handleEnterKey() {
      console.log("enter pressed")
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
    const messages: Message[] = [
      {
        // TODO Change this to your own prompt
        content:
          'Write a small rap song about 2 potatoes that are in love with Angular',
        role: 'user',
      },
    ];

    this.openAiResult$ = this.openAiService.doOpenAICall(
      messages,
      0.5,
      'gpt-3.5-turbo',
      this.apiKey
    );
  }
}