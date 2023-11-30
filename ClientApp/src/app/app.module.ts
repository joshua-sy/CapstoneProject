import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { SvfComponent } from './svf/svf.component';

import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { WebSvfComponent } from './web-svf/web-svf.component';
import { InputComponent } from './input/input.component';
import { OutputComponent } from './output/output.component';
import { GraphsComponent } from './graphs/graphs.component';

import { AngularSplitModule } from 'angular-split';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { MultiSelectDropdownComponent } from './toolbar/multi-select-dropdown/multi-select-dropdown.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DirectoryComponent } from './directory/directory.component';
import { ErrorDialog } from './web-svf/error-dialog/error-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    SvfComponent,
    WebSvfComponent,
    InputComponent,
    OutputComponent,
    GraphsComponent,
    ToolbarComponent,
    MultiSelectDropdownComponent,
    DirectoryComponent,
    ErrorDialog,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'websvf', component: WebSvfComponent, pathMatch: 'full' },
      { path: 'svf', component: SvfComponent, pathMatch: 'full' },
    ]),
    CodemirrorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSelectModule,
    MatTabsModule,
    AngularSplitModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    MultiSelectDropdownComponent
  ]
})
export class AppModule {}
